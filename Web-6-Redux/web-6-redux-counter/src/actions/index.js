/* Actions here */


export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'
export const INCREMENT_BY = 'INCREMENT_BY'
export const DECREMENT_BY = 'DECREMENT_BY'


export const incrementCounter = () => {
    return {
        type: INCREMENT
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT
    }
}

export const resetCounter = () => {
    return {
        type: RESET
    }
}

export const incrementBy = (addBy) => {
    return {
        type: INCREMENT_BY,
        payload: { addBy }
    }
}

export const decrementBy = (subBy) => {
    return {
        type: DECREMENT_BY,
        payload: { subBy }
    }
}