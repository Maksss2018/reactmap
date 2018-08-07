import NEW_USER_ADDED from "../actions/index";
export default function(state = null, action) {
    console.log("action type :" + action.type);
    console.log("action.payload :" + JSON.stringify(action.payload));
    let container;
    switch (action.type) {
        case "NEW_USER_ADDED":

            return action.payload;
            break;

        case 'NEW_USER_LOST':

            return action.payload;

            break;
        case 'USER_LOGIN':
            return {
                marks: action.payload.marks,
                _id: action.payload._id,
                name: action.payload.name,
                password: action.payload.password,
                logIn: action.payload.logIn
            };
            break;

        default:
            return state
    }
}
