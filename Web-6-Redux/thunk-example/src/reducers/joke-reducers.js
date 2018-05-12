import { GET_JOKE } from '../actions';

const jokeReducer = ( state = '', action ) => {
    switch(action.type) {
        case GET_JOKE:
            return action.payload.obj

        default:
            return state
    }
}

export default jokeReducer