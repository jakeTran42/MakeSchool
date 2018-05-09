export const NEW_TIME = "NEW_TIMER"
export const RESET_TIMER = "RESET_TIMER"
export const DELETE_TIMER = "DELETE_TIMER"
export const START_TIMER = "START_TIMER"
export const STOP_TIMER = "STOP_TIMER"
export const TOGGLE_TIMER = "TOGGLE_TIMER"
export const SELECT_TIMER = "SELECT_TIMER"
export const UPDATE = "UPDATE"


export const addTimer = (name) => {
    return {
        type: NEW_TIME,
        payload: { name, time: 0, isRunning: false }
    }
}

export const update = (deltaTime) => {
    return {
        type: UPDATE,
        payload: { deltaTime }
    }
}

export const resetTimer = (index) => {
    return {
        type: RESET_TIMER,
        payload: { index }
    }
}

export const deleteTimer = (index) => {
    return {
        type: DELETE_TIMER,
        payload: { index }
    }
}

export const startTimer = (index) => {
    return {
        type: START_TIMER,
        payload: { index }
    }
}

export const stopTimer = (index) => {
    return {
        type: STOP_TIMER,
        payload: { index }
    }
}

export const toggleTimer = (index) => {
    return {
        type: TOGGLE_TIMER,
        payload: { index }
    }
}

export const selectTimer = (index) => {
    return {
        type: SELECT_TIMER,
        payload: { index }
    }
}