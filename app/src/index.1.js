import {combineReducers} from "redux";
import {user} from "./user";


const reducers = combineReducers({
    user:user
});
export default reducers;