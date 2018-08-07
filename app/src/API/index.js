import axios from 'axios';
import actions from '../actions/index';
import { apiPrefix } from '../configs/configs.json';
export function SignIn(user) {
    console.log("ActionCreate in Use");
    return (dispatch) => {
        return axios.post(`${apiPrefix}/sign-in`, user).then((response) => {

            dispatch(actions.addNewUser(response.data));
        })
    }
}
export function sendResulttWithLoginAndPassword(data) {
    console.log("data :" + JSON.stringify(data));
    return (dispatch) => {
        return axios.post(`${apiPrefix}/`, data).then((response) => {
            dispatch(actions.pushCookiesTostate(response.data));
        })
    }

}
export function getTypesFromDB() {
    return (dispatch) => {
        return axios.post(`${apiPrefix}/all-types`).then((response) => {
            dispatch(actions.getTypes(response.data));
        })
    }

}
export function getMarksByType(data) {
    return (dispatch) => {

        return axios.post(`${apiPrefix}/get-nearest-places`, data).then((response) => {
            dispatch(actions.nearestPlacesByType(response));
        }).catch(error => { console.log("promise catch  error" + error) });
    }

}
/*https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=AIzaSyB2Dt6pCKcFvO4FxADbJDoK8gnvKNkLS1w
export function loginLogoutAPI(data){
  return (dispatch)=>{
         return  axios.post(`${apiPrefix}/in-out`, data).then((response) => {
            console.log(" response.data : "+ JSON.stringify(response.data));
            dispatch(actions.pushCookiesTostate(response.data));    
      });
          }
    }*/
export function newMarksAPI(data) {
    return axios.get(`${apiPrefix}/save-marks${data.id}`, data.marks);
}
