import { createStore, combineReducers } from "redux";
import letters from "../modules/letters";
import member from "../modules/member";

const rootReducer = combineReducers({ letters, member });

const store = createStore(rootReducer);

export default store;
