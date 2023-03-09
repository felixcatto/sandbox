import { interpret } from 'xstate';
import { clockMachine } from '../client/alarmClock';

const makeClock = (hours = 0, minutes = 0, seconds = 0) => {
  const clockService = interpret(
    clockMachine.withContext({
      ...clockMachine.initialState.context,
      hours,
      minutes,
      seconds,
    })
  ).start();

  return {
    send: clockService.send,
    getTime: () => {
      const { hours, minutes, seconds } = clockService.state.context;
      return [hours, minutes, seconds];
    },
    getAlarmTime: () => {
      const { alarmHours, alarmMinutes } = clockService.state.context;
      return [alarmHours, alarmMinutes];
    },
    getCurrentState: () => clockService.state,
    getCurrentMode: () => clockService.state.value,
    isAlarmOn: () => clockService.state.context.isAlarmOn,
  };
};

describe('clock', () => {
  it('should inc seconds', () => {
    const clock = makeClock(0, 0, 0);
    clock.send('TICK');
    expect(clock.getTime()).toMatchObject([0, 0, 1]);
  });

  it('should inc minutes', () => {
    const clock = makeClock(0, 0, 59);
    clock.send('TICK');
    expect(clock.getTime()).toMatchObject([0, 1, 0]);
  });

  it('should inc hours', () => {
    const clock = makeClock(12, 59, 59);
    clock.send('TICK');
    expect(clock.getTime()).toMatchObject([13, 0, 0]);
  });

  it('should inc hours 2', () => {
    const clock = makeClock(23, 59, 59);
    clock.send('TICK');
    expect(clock.getTime()).toMatchObject([0, 0, 0]);
  });

  it('should work clickH and clickM', () => {
    const clock = makeClock(0, 0, 32);
    clock.send('MODE');
    clock.send('CLICK_MINUTE');
    clock.send('CLICK_MINUTE');
    clock.send('CLICK_HOUR');
    clock.send('MODE');
    expect(clock.getTime()).toMatchObject([1, 2, 0]);
  });

  it('should work ALARM clickH and clickM', () => {
    const clock = makeClock(0, 0, 0);
    clock.send('ALARM_MODE');
    clock.send('CLICK_MINUTE');
    clock.send('CLICK_MINUTE');
    clock.send('CLICK_HOUR');
    clock.send('ALARM_MODE');
    expect(clock.isAlarmOn()).toBeTruthy();
    expect(clock.getAlarmTime()).toMatchObject([1, 2]);
  });

  it('should trigger ALARM', () => {
    const clock = makeClock(0, 0, 0);
    clock.send('ALARM_MODE');
    clock.send('CLICK_MINUTE');
    clock.send('ALARM_MODE');
    for (let i = 0; i < 60; i++) {
      clock.send('TICK');
    }
    expect(clock.getCurrentState().matches('alarm')).toBeTruthy();
  });
});
