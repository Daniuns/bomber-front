import React, { useEffect, useState } from "react";
import "./App.css";
import heroService from "./sevices/hero/index";
import { IHero } from "./interfaces/hero";
import Map from "./components/Map/index";
import Hero from "./components/Hero/index";
import keyBoardService from "./sevices/keyBoard/index";
import { combineLatest } from "rxjs/operators";

function App() {
  // const [actualPositionTop, setActualPostionTop] = useState(0);
  // const [actualPositionLeft, setActualPostionLeft] = useState(0);
  const [allHeroes, setAllHeroes] = useState<IHero[]>([]);

  // const positionHero = (hero: IHero) => {
  //   const element: any = document.getElementById(
  //     `${hero.positionY}x${hero.positionX}`
  //   );

  //   if (!element) return;

  //   const heroElement: any = document.getElementById("hero");

  //   setActualPostionTop(element.offsetTop + 20);
  //   setActualPostionLeft(element.offsetLeft + 20);

  //   heroElement.scrollIntoView({ block: "center" });
  // };

  const acceptedMoves: any = {
    ArrowUp(hero: IHero) {
      heroService.setStateHero({
        positionY: hero.positionY - 1
      });
    },
    ArrowDown(hero: IHero) {
      heroService.setStateHero({
        positionY: hero.positionY + 1
      });
    },
    ArrowLeft(hero: IHero) {
      heroService.setStateHero({
        positionX: hero.positionX - 1
      });
    },
    ArrowRight(hero: IHero) {
      heroService.setStateHero({
        positionX: hero.positionX + 1
      });
    }
  };

  useEffect(() => {
    heroService.createHero();
    heroService.receiveListHeroes();
    const sub$ = keyBoardService
      .eventKeyBoard()
      .pipe(combineLatest(heroService.getStateHero()))
      .subscribe(([key, hero]) => {
        const fc = acceptedMoves[key];
        if (!!fc) {
          fc(hero);
        }
      });

    // const sub1$ = heroService
    //   .getStateHero()
    //   .pipe(
    //     combineLatest(mapService.isLoading()),
    //     filter(([, isLoading]) => !isLoading)
    //   )
    //   .subscribe(([hero]) => {
    //     console.log(hero);
    //     positionHero(hero);
    //   });

    const allHeroes$ = heroService
      .getAllHeroes()
      .subscribe(ah => setAllHeroes(ah));

    return () => {
      // sub1$.unsubscribe();
      sub$.unsubscribe();
      allHeroes$.unsubscribe();
    };
  }, []);

  // if (!!loading) {
  //   return <div>Aguarde...</div>;
  // }
  return (
    <div className="App">
      {/* <div
        id="hero"
        style={{ top: actualPositionTop, left: actualPositionLeft }}
        className={classes.hero}
      /> */}
      {allHeroes.map((hero, index) => {
        return <Hero key={index} hero={hero} />;
      })}
      <Map />
    </div>
  );
}

export default App;
