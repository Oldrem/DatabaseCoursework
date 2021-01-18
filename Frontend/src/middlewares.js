import {applyMiddleware} from "redux";
import loginMiddleware from "./middlewares/loginMiddleware";
import registerMiddleware from "./middlewares/registerMiddleware";
import mainMiddleware from "./middlewares/mainMiddleware";

export default applyMiddleware(loginMiddleware, registerMiddleware, mainMiddleware);
