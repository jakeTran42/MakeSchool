export const NEW_TIME = "NEW_TIMER"
export const RESET_TIMER = "RESET_TIMER"
export const DELETE_TIMER = "DELETE_TIMER"
export const START_TIMER = "START_TIMER"
export const STOP_TIMER = "STOP_TIMER"
export const TOGGLE_TIMER = "TOGGLE_TIMER"
export const SELECT_TIMER = "SELECT_TIMER"


export const newTime = () => {
    return {
        type: NEW_TIME
    }
}

export const resetTimer = () => {
    return {
        type: RESET_TIMER,
        payload: { index }
    }
}

export const deleteTimer = () => {
    return {
        type: DELETE_TIMER,
        payload: { index }
    }
}

export const startTimer = () => {
    return {
        type: START_TIMER,
        payload: { index }
    }
}

export const stopTimer = () => {
    return {
        type: STOP_TIMER,
        payload: { index }
    }
}

export const toggleTimer = () => {
    return {
        type: TOGGLE_TIMER,
        payload: { index }
    }
}

export const selectTimer = () => {
    return {
        type: SELECT_TIMER,
        payload: { index }
    }
}