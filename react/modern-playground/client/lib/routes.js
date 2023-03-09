import { makeUndefinedKeyError } from './utils';

export default makeUndefinedKeyError({
  root: '/',
  menu: {
    index: '/menu',
    xstate: '/menu/xstate',
    reactState: '/menu/react_state',
  },
  alarmClock: '/alarm_clock',
});
