import * as rxjs from "rxjs";
import { map } from "rxjs/operators";
class KeyBoard {
  eventKeyBoard = () => {
    return rxjs.fromEvent(document, "keydown").pipe(map((e: any) => e.key));
  };
}
const keyBoardService = new KeyBoard();

export default keyBoardService;
