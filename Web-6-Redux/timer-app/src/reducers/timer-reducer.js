import { NEW_TIME, START_TIMER, DELETE_TIMER, RESET_TIMER, STOP_TIMER, TOGGLE_TIMER } from '../actions'

const timerReducer = (state= [], action) => {
    switch (action.type) {
        case NEW_TIME:
            return [...state]
        case RESET_TIMER:
            const { index } = action.payload

        case DELETE_TIMER:

        case START_TIMER:

        case STOP_TIMER:

        case TOGGLE_TIMER:

        default:
            return state;

    }
}


export default timerReducer;