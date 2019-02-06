import React, { useState, useMemo, useEffect } from 'react';
import cn from 'classnames';
import { Machine, actions } from 'xstate';
import { useMachine } from '../lib/utils';
import ss from './Goat.local.scss';


const goatMachine = Machine(
  {
    id: 'goat',
    initial: 'idle',
    context: {
      goat: null,
    },
    states: {
      idle: {
        on: {
          GOAT_LOAD_REQUEST: 'loading',
        },
      },
      loading: {
        on: {
          GOAT_LOAD_SUCCESS: 'loadSuccess',
          GOAT_LOAD_ERROR: 'loadError',
        },
      },
      loadSuccess: {
        onEntry: 'setGoatUrl',
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
        goat: (ctx, event) => event.payload.goatUrl,
      }),
    },
  },
);

const GoatSDeclarativeMachine = (props) => {
  const { goatUrl, sleep } = props;
  const [goatState, dispatch] = useMachine(goatMachine);
  console.log(goatState);

  const onClick = async () => {
    dispatch('GOAT_LOAD_REQUEST');
    try {
      await sleep(1500);
      dispatch({
        type: 'GOAT_LOAD_SUCCESS',
        payload: { goatUrl },
      });
    } catch (e) {
      dispatch('GOAT_LOAD_ERROR');
    }
  };

  const { goat } = goatState.context;

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
            <span className="alert alert-primary">{`Goat fail :'(`}</span>
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
            <img src={goat} className={ss.image} />
          </div>
        </React.Fragment>
      }

    </div>
  );
};

export default GoatSDeclarativeMachine;
