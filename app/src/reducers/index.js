import { combineReducers } from "redux";
//import User from "./User";
import newUser from "./newUser.js";
import places from "./places.js";
import nearestPlaces from "./nearestPlaces.js";

const reducers = combineReducers({
    user: newUser,
    places: places,
    nearestPlaces: nearestPlaces
});
export default reducers;
