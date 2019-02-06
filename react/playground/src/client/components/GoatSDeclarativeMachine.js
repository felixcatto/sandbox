import React, { useState, useMemo, useEffect } from 'react';
import cn from 'classnames';
import { Machine, actions } from 'xstate';
import { useMachine, getGoatUrl } from '../lib/utils';
import ss from './Goat.local.scss';


const goatMachine = Machine(
  {
    id: 'goat',
    initial: 'idle',
    context: {
      goatUrl: null,
      goatErrorMsg: '',
    },
    states: {
      idle: {
        on: {
          GOAT_LOAD_REQUEST: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'getGoat',
          src: (ctx, event) => getGoatUrl(),
          onDone: {
            target: 'loadSuccess',
            actions: 'setGoatUrl',
          },
          onError: {
            target: 'loadError',
            actions: 'setGoatError',
          },
        },
      },
      loadSuccess: {
        on: {
          GOAT_LOAD_REQUEST: 'loading',
        },
      },
      loadError: {
        on: {
          GOAT_LOAD_REQUEST: 'loading',
        },
      },
    },
  },
  {
    actions: {
      setGoatUrl: actions.assign({
        goatUrl: (ctx, event) => event.data.goatUrl,
      }),
      setGoatError: actions.assign({
        goatErrorMsg: (ctx, event) => event.data.goatErrorMsg,
      }),
    },
  },
);

const GoatSDeclarativeMachine = (props) => {
  const [goatState, dispatch] = useMachine(goatMachine);
  console.log(goatState);

  const onClick = () => dispatch('GOAT_LOAD_REQUEST');

  const { goatUrl, goatErrorMsg } = goatState.context;

  return (
    <div>

      <h1>{`Goat Loader :)`}</h1>

      {goatState.matches('idle') &&
        <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
          <span>Load Goat Now!</span>
        </button>
      }

      {goatState.matches('loadError') &&
        <React.Fragment>
          <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
            <span>Try load again</span>
          </button>

          <div className="mt-25">
            <span className="alert alert-primary">{goatErrorMsg}</span>
          </div>
        </React.Fragment>
      }

      {goatState.matches('loading') &&
        <React.Fragment>
          <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
            <span>Loading...</span>
            <div className="spinner-border spinner-border-sm text-light ml-10"></div>
          </button>

          <div className="mt-25">
            <span className="alert alert-primary">Loading...</span>
          </div>
        </React.Fragment>
      }

      {goatState.matches('loadSuccess') &&
        <React.Fragment>
          <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
            <span>Load Another Goat</span>
          </button>

          <div className="mt-20">
            <img src={goatUrl} className={ss.image} />
          </div>
        </React.Fragment>
      }

    </div>
  );
};

export default GoatSDeclarativeMachine;
