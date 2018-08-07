//import api from "../API/index";
import Cookies from 'universal-cookie';
export default {
    addNewUser(response) {

        const cookies = new Cookies();
        cookies.set("name", response.name);
        cookies.set("password", response.password);
        cookies.set("id", response._id);
        cookies.set("userLocationLan", response.marks[0].lat);
        cookies.set("userLocationLng", response.marks[0].lng);
        cookies.set("LogIn", response.logIn);
        return {
            type: "NEW_USER_ADDED",
            payload: response
        }
    },
    pushCookiesTostate(user) {
        return {
            type: "USER_LOGIN",
            payload: user
        }

    },
    getTypes(places) {
        return {
            type: "TYPES_GET",
            payload: places
        }

    },
    nearestPlacesByType(placesArray) {
        return {
            type: "PLACES_BY_TYPES_GET",
            payload: placesArray
        }

    },
    /*
    findUserByPasswordAndLogin (data) {
        api.signIn(data).then((res)=>{
            
        return{
            type: "NEW_USER_ADDED",
            msg: res
        };    
        }).catch((error)=>{
                return{
            type: "NEW_USER_LOST",
            msg: error
        };
        });
        
    },
    checkPasswordAndLogin  (user) {
        console.log(" id :"+user.id);
        return{
            type: "USER_CHECKED",
            userChecked:user.id
        };
    } */
};
