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
      goatErrorMsg: null,
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
        onEntry: 'setGoatError',
        on: {
          GOAT_LOAD_REQUEST: 'loading',
        },
      },
    },
  },
  {
    actions: {
      setGoatUrl: actions.assign({
        goatUrl: (ctx, event) => event.payload.goatUrl,
      }),
      setGoatError: actions.assign({
        goatErrorMsg: (ctx, event) => event.payload.goatErrorMsg,
      }),
    },
  },
);

const GoatSMachine = (props) => {
  const [goatState, dispatch] = useMachine(goatMachine);
  console.log(goatState);

  const onClick = async () => {
    dispatch('GOAT_LOAD_REQUEST');
    try {
      const { goatUrl } = await getGoatUrl();
      dispatch({
        type: 'GOAT_LOAD_SUCCESS',
        payload: { goatUrl },
      });
    } catch ({ goatErrorMsg }) {
      dispatch({
        type: 'GOAT_LOAD_ERROR',
        payload: { goatErrorMsg },
      });
    }
  };

  const { goatUrl, goatErrorMsg } = goatState.context;

  return (
    <div>

      <h1>{`Goat Loader :)`}</h1>

      <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
        {goatState.matches('idle') &&
          <span>Load Goat Now!</span>
        }
        {goatState.matches('loadError') &&
          <span>Try load again</span>
        }
        {goatState.matches('loading') &&
          <React.Fragment>
            <span>Loading...</span>
            <div className="spinner-border spinner-border-sm text-light ml-10"></div>
          </React.Fragment>
        }
        {goatState.matches('loadSuccess') &&
          <span>Load Another Goat</span>
        }
      </button>

      <div className="mt-25">
        {goatState.matches('loadError') &&
          <span className="alert alert-primary">{goatErrorMsg}</span>
        }
        {goatState.matches('loading') &&
          <span className="alert alert-primary">Loading...</span>
        }
      </div>

      {goatState.matches('loadSuccess') &&
        <div className="mt-20">
          <img src={goatUrl} className={ss.image} />
        </div>
      }

    </div>
  );
};

export default GoatSMachine;
