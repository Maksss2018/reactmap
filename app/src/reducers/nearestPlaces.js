export default function(state = null, action) {

    switch (action.type) {

        case 'PLACES_BY_TYPES_GET':

            return action.payload;

            break;

        default:
            return state
    }
}
