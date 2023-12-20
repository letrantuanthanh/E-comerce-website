import { combineReducers } from "redux";
import ReducerCart from "./ReducerCart";
import ReducerSession from "./ReducerSession";
import ReducerAuth from "./ReducerAuth";

const ReducerRoot = combineReducers({
  Cart: ReducerCart,
  Session: ReducerSession,
  Auth: ReducerAuth,
});

export default ReducerRoot;
