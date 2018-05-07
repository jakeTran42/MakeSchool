import { SELECT_TIMER } from '../actions'

const selectTimerReducer = (state = null, action) => {
    switch (action.type) {
        case SELECT_TIMER:
            const { index } = action.payload
            return index
        default:
            return state;
    }
}

export default selectTimerReducer;