import React, { useEffect, useState, memo } from "react";
import "./App.css";
import heroService from "./sevices/hero/index";
import { IHero } from "./interfaces/hero";
import Map from "./components/Map/index";
import Hero from "./components/Hero/index";
import keyBoardService from "./sevices/keyBoard/index";
import { combineLatest } from "rxjs/operators";

function App() {
  const [allHeroes, setAllHeroes] = useState<IHero[]>([]);

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

    const allHeroes$ = heroService
      .getAllHeroes()
      .subscribe(ah => setAllHeroes(ah));

    return () => {
      sub$.unsubscribe();
      allHeroes$.unsubscribe();
    };
  }, []);

  // if (!!loading) {
  //   return <div>Aguarde...</div>;
  // }
  return (
    <div className="App">
      {allHeroes.map(hero => {
        console.log("oi", hero);
        return <Hero key={hero.id} hero={hero} />;
      })}
      <Map />
    </div>
  );
}

export default memo(App);
