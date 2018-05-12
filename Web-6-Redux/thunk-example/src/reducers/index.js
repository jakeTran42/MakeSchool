import { combineReducers } from 'redux';
import jokeReducer from './joke-reducers'

export default combineReducers({  
        jokes: jokeReducer 
})