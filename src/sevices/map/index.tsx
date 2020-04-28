import { IMap } from "../../interfaces/map";
import * as rxjs from "rxjs";
import socket from "../../socket";

class Map {
  private myMap: IMap[][] = [[]];
  private loading$ = new rxjs.BehaviorSubject(true);

  generateMap = () => {
    socket.on("receiveMap", (map: any) => {
      this.myMap = map;
      this.loading$.next(false);
    });
  };

  getMap = () => {
    return this.myMap;
  };

  isLoading = () => {
    return this.loading$.asObservable();
  };
}
const mapService = new Map();

export default mapService;
