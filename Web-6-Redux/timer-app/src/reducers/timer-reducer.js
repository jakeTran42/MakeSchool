import { NEW_TIME, START_TIMER, DELETE_TIMER, RESET_TIMER, STOP_TIMER, TOGGLE_TIMER, UPDATE } from '../actions'


export class Timer {
    constructor(name) {
        this.name = name;
        this.isRunning = false;
        this.time = 0;
    }
}



const timerReducer = (state= [], action) => {
    switch (action.type) {
        case NEW_TIME:
            const { name, time, isRunning } = action.payload
            if ( action.payload.name === '' ) {
                const defaultName = 'Timer ' + (state.length + 1).toString()
                return [...state, { name: defaultName, time, isRunning }]
                // return [...state, new Timer(defaultName)]
            }
            return [...state, { name, time, isRunning }]

        case RESET_TIMER:
            return state.map((item, index) => {
                if (index !== action.payload.index) {
                    return item
                }
                return { ...item, time: 0, isRunning: false };
            })

        case DELETE_TIMER:
            const { index } = action.payload
            return [...state.slice(0, index), ...state.slice(index + 1)]

        case START_TIMER:
            return state.map((item, index) => {
                if (index !== action.payload.index) {
                    return item
                }
                return {...item, isRunning: true }
            })

        case STOP_TIMER:
            return state.map((item, index) => {
                if (index !== action.payload.index) {
                    return item
                }
                return {...item, isRunning: false}
            })

        case TOGGLE_TIMER:
            return state.map((item, index) => {
                if (index !== action.payload.index) {
                    return item
                }
                return { ...item, isRunning: !item.isRunning };
            })
        
        case UPDATE:
            return state.map((timer) => {
                if (timer.isRunning) {
                timer = {...timer, time: timer.time += action.payload.deltaTime }
                }
                return timer
            })
            

        default:
            return state;

    }
}


export default timerReducer;