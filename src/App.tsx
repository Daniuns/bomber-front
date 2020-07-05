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

  const nextImg = (img: string) => {
    let number = Number(img.substr(5)) + 1;
    if (number >= 7) {
      number = 0;
    }
    return img.substr(0, 6) + number;
  };

  const acceptedMoves: any = {
    ArrowUp(hero: IHero) {
      if (!hero.img.startsWith("BmanB")) {
        hero.img = "BmanB00";
      }
      heroService.setStateHero({
        positionY: hero.positionY - 1,
        img: nextImg(hero.img)
      });
    },
    ArrowDown(hero: IHero) {
      if (!hero.img.startsWith("BmanF")) {
        hero.img = "BmanF00";
      }
      heroService.setStateHero({
        positionY: hero.positionY + 1,
        img: nextImg(hero.img)
      });
    },
    ArrowLeft(hero: IHero) {
      heroService.setStateHero({
        positionX: hero.positionX - 1
      });
    },
    ArrowRight(hero: IHero) {
      if (!hero.img.startsWith("BmanR")) {
        hero.img = "BmanR00";
      }
      heroService.setStateHero({
        positionX: hero.positionX + 1,
        img: nextImg(hero.img)
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
        return <Hero key={hero.id} hero={hero} />;
      })}
      <Map />
    </div>
  );
}

export default memo(App);
