import React from 'react';
import { useMachine } from '@xstate/react';
import cn from 'classnames';
import { createMachine, assign, actions } from 'xstate';
import { add } from 'date-fns';
import s from './styles.module.scss';

export const clockMachine = createMachine(
  {
    initial: 'clock',
    context: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      alarmHours: 0,
      alarmMinutes: 0,
      isAlarmOn: false,
    },
    on: {
      TICK: { actions: 'makeTick' },
    },
    invoke: { src: 'timer' },
    states: {
      clock: {
        always: { cond: 'isAlarmTime', target: 'alarm' },
        on: {
          MODE: 'clockEdit',
          ALARM_MODE: 'alarmEdit',
          DISABLE_ALARM: { actions: 'disableAlarm' },
        },
      },
      clockEdit: {
        on: {
          MODE: {
            target: 'clock',
            actions: 'setSecondsToZero',
          },
          CLICK_MINUTE: { actions: 'addMinute' },
          CLICK_HOUR: { actions: 'addHour' },
          TICK: null,
        },
      },
      alarmEdit: {
        on: {
          ALARM_MODE: {
            target: 'clock',
            actions: 'enableAlarm',
          },
          CLICK_MINUTE: { actions: 'addAlarmMinute' },
          CLICK_HOUR: { actions: 'addAlarmHour' },
        },
      },
      alarm: {
        on: {
          ALARM_MODE: {
            target: 'clock',
            actions: 'disableAlarm',
          },
        },
      },
    },
  },

  {
    actions: {
      makeTick: assign(ctx => {
        const { hours, minutes, seconds } = ctx;
        return (
          add(new Date(0, 0, 0, hours, minutes, seconds), { seconds: 1 })
          |> (v => ({
            hours: v.getHours(),
            minutes: v.getMinutes(),
            seconds: v.getSeconds(),
          }))
        );
      }),
      addMinute: assign(ctx => {
        const { hours, minutes } = ctx;
        return (
          add(new Date(0, 0, 0, hours, minutes), { minutes: 1 })
          |> (v => ({
            hours: v.getHours(),
            minutes: v.getMinutes(),
          }))
        );
      }),
      addHour: assign(ctx => {
        const { hours } = ctx;
        return add(new Date(0, 0, 0, hours), { hours: 1 }) |> (v => ({ hours: v.getHours() }));
      }),
      setSecondsToZero: assign(ctx => ({ seconds: 0 })),
      enableAlarm: assign(ctx => ({ isAlarmOn: true })),
      disableAlarm: assign(ctx => ({ isAlarmOn: false })),
      addAlarmHour: assign(ctx => ({ alarmHours: (ctx.alarmHours + 1) % 24 })),
      addAlarmMinute: assign(ctx => ({ alarmMinutes: (ctx.alarmMinutes + 1) % 60 })),
    },

    guards: {
      isAlarmTime: ({ isAlarmOn, alarmHours, alarmMinutes, hours, minutes }) =>
        isAlarmOn && alarmMinutes === minutes && alarmHours === hours,
    },

    services: {
      timer: (context, event) => callback => {
        const id = setInterval(() => callback('TICK'), 1000);
        return () => clearInterval(id);
      },
    },
  }
);

const AlarmClock = () => {
  const now = new Date();
  const [state, send] = useMachine(
    clockMachine.withContext({
      ...clockMachine.initialState.context,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    })
  );

  const { hours, minutes, seconds, isAlarmOn, alarmMinutes, alarmHours } = state.context;
  const clickHour = () => send('CLICK_HOUR');
  const clickMinute = () => send('CLICK_MINUTE');
  const clickMode = () => send('MODE');
  const clickAlarmMode = () => send('ALARM_MODE');
  const disableAlarm = () => send('DISABLE_ALARM');
  const buttonClass = cn('btn btn-sm btn-primary', s.button);

  return (
    <div>
      {state.matches('clock') && (
        <div>
          <div className="d-flex align-items-center mb-5">
            <div className={cn(s.clock, 'mr-10')}>
              <span>{String(hours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
            {isAlarmOn && <i className="fa fa-bell"></i>}
          </div>
          <div>
            <button className={buttonClass} onClick={clickMode}>
              Mode
            </button>
            <button className={buttonClass} onClick={clickAlarmMode}>
              Alarm Mode
            </button>
            {isAlarmOn && (
              <button className={buttonClass} onClick={disableAlarm}>
                Disable Alarm
              </button>
            )}
          </div>
        </div>
      )}

      {state.matches('clockEdit') && (
        <div>
          <div className="d-flex align-items-center mb-5">
            <div className={cn(s.clock, 'mr-20')}>
              <span>hh:{String(hours).padStart(2, '0')}</span>
              <span> </span>
              <span>mm:{String(minutes).padStart(2, '0')}</span>
            </div>
            <div className={s.mode}>{state.value}</div>
          </div>
          <div>
            <button className={buttonClass} onClick={clickMode}>
              Mode
            </button>
            <button className={buttonClass} onClick={clickAlarmMode}>
              Alarm Mode
            </button>
            <button className={buttonClass} onClick={clickHour}>
              Hour
            </button>
            <button className={buttonClass} onClick={clickMinute}>
              Minute
            </button>
          </div>
        </div>
      )}

      {state.matches('alarmEdit') && (
        <div>
          <div className="d-flex align-items-center mb-5">
            <div className={cn(s.clock, 'mr-20')}>
              <span>hh:{String(alarmHours).padStart(2, '0')}</span>
              <span> </span>
              <span>mm:{String(alarmMinutes).padStart(2, '0')}</span>
            </div>
            <div className={s.mode}>{state.value}</div>
          </div>
          <div>
            <button className={buttonClass} onClick={clickMode}>
              Mode
            </button>
            <button className={buttonClass} onClick={clickAlarmMode}>
              Alarm Mode
            </button>
            <button className={buttonClass} onClick={clickHour}>
              Hour
            </button>
            <button className={buttonClass} onClick={clickMinute}>
              Minute
            </button>
          </div>
        </div>
      )}

      {state.matches('alarm') && (
        <div>
          <div className="d-flex align-items-center mb-5">
            <div className={cn(s.clock, 'mr-10')}>
              <span>{String(alarmHours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(alarmMinutes).padStart(2, '0')}</span>
            </div>
            <i className="fa fa-bell shakeX"></i>
          </div>
          <div>
            <button className={buttonClass} onClick={clickAlarmMode}>
              Stop Alarm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlarmClock;
