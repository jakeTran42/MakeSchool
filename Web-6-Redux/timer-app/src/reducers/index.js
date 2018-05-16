import { combineReducers } from 'redux';
import timerReducer from './timer-reducer';
import selectTimerReducer from './select-timer-reducer';

export default combineReducers({

    timers: timerReducer,
    selectedTimer: selectTimerReducer

})

