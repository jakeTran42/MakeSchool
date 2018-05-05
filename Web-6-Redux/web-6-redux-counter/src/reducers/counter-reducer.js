import { INCREMENT, DECREMENT, RESET, INCREMENT_BY, DECREMENT_BY } from '../actions'


const counterReducer = (state = 0, action) => {
  console.log(action)
  switch(action.type) {
    case INCREMENT:
      const newIncrement = state + 1
      return newIncrement
    case DECREMENT:
      const newDecrement = state - 1
      return newDecrement
    case RESET:
      const resetState = 0
      return resetState
    case INCREMENT_BY:
      const { addBy } = action.payload
      const increaseValue = state + addBy
      return increaseValue
    case DECREMENT_BY:
      const { subBy } = action.payload
      const decreaseValue = state - subBy
      return decreaseValue
    default:
      return state
  }
}

export default counterReducer;
