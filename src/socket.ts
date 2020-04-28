import socketIOClient from "socket.io-client";
import { URL_API } from "./settings";

const socket = socketIOClient(URL_API);

export default socket;
