import { addTimer, NEW_TIME, update, UPDATE } from './index';

describe('Testing actions', () => {
    it('returns {NEW_TIMER} object', () => {
        const newTimer = addTimer('Timer0');
        const payloadReturn = { name:'Timer0', time:0, isRunning:false };
        expect(typeof newTimer).toBe('object');
        expect(newTimer.type).toBe(NEW_TIME);
        expect(typeof newTimer.payload).toBe('object');
        expect(newTimer.payload.name).toBe('Timer0')
        expect(newTimer.payload).toEqual(payloadReturn)
    });
})

describe('Testing actions', () => {
    it('return Update object', () => {
        const updateTime = update(1000);
        expect(typeof updateTime).toBe('object');
        expect(update().type).toBe(UPDATE);
        expect(updateTime.payload).toEqual({deltaTime: 1000})
    })
})