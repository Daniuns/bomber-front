import { BehaviorSubject, Observable } from "rxjs";
import { IHero } from "../../interfaces/hero";
import mapService from "../map";
import socket from "../../socket";

export const initialState: IHero = {
  positionY: 1,
  positionX: 1,
  speed: 1
};

class Hero {
  private stateHero$ = new BehaviorSubject<IHero>(initialState);
  private allHeroes$ = new BehaviorSubject<IHero[]>([]);
  private refreshing = false;

  createHero = () => {
    // socket.emit("createHero", "ready");
    console.log("statehero", this.stateHero$.getValue());
    socket.on("createHero", (hero: IHero) => {
      if (!this.stateHero$.getValue().id) {
        this.stateHero$.next(hero);
        // this.setStateHero(hero);
      }
    });
  };

  getStateHero = (): Observable<IHero> => {
    return this.stateHero$.asObservable();
  };

  public setStateHero = (proprierty: Partial<IHero>) => {
    if (!this.refreshing && !!this.stateHero$.getValue().id) {
      this.refreshing = true;
      const newStatusHero = { ...this.stateHero$.getValue(), ...proprierty };
      const goTo = mapService
        .getMap()
        .map(v =>
          v.find(
            v =>
              v.positionX === newStatusHero.positionX &&
              v.positionY === newStatusHero.positionY
          )
        )
        .filter(v => !!v)[0];

      if (!!goTo) {
        if (!goTo.bloked) {
          socket.emit("attHero", newStatusHero);
          this.stateHero$.next(newStatusHero);
        }
      }
      setTimeout(() => {
        this.refreshing = false;
      }, this.stateHero$.getValue().speed * 1000);
    }
  };

  setRefreshing = () => {
    this.refreshing = !this.refreshing;
  };

  receiveListHeroes = () => {
    socket.on("heroesList", (heroes: IHero[]) => {
      console.log("heroesLIst", heroes);
      this.allHeroes$.next(heroes);
    });
  };

  getAllHeroes = () => {
    return this.allHeroes$.asObservable();
  };
}

const heroService = new Hero();

export default heroService;
