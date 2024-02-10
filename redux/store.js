import * as Redux from "redux";
import countreducer from "./reducers";
import thunk from "redux-thunk";

const rootreducer = Redux.combineReducers({ countreducer });
export default Redux.createStore(rootreducer, Redux.applyMiddleware(thunk));
