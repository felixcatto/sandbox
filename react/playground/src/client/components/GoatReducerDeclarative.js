import React, { useReducer } from 'react';
import cn from 'classnames';
import { getGoatUrl } from '../lib/utils';
import ss from './Goat.local.scss';


const initialState = {
  goatState: 'idle',
  goatUrl: null,
  goatErrorMsg: null,
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'GOAT_LOAD_REQUEST':
      return {
        goatState: 'loading',
        goatUrl: null,
        goatErrorMsg: null,
      };
    case 'GOAT_LOAD_SUCCESS':
      return {
        goatState: 'loadSuccess',
        goatUrl: action.payload.goatUrl,
        goatErrorMsg: null,
      };
    case 'GOAT_LOAD_ERROR':
      return {
        goatState: 'loadError',
        goatUrl: null,
        goatErrorMsg: action.payload.goatErrorMsg,
      };
    default:
      return state;
  }
};

const GoatReducer = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goatUrl, goatErrorMsg, goatState } = state;

  const onClick = async () => {
    if (goatState === 'loading') return;

    dispatch({ type: 'GOAT_LOAD_REQUEST' });
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

  return (
    <div>

      <h1>{`Goat Loader :)`}</h1>

      {goatState === 'idle' &&
        <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
          <span>Load Goat Now!</span>
        </button>
      }

      {goatState === 'loadError' &&
        <React.Fragment>
          <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
            <span>Try load again</span>
          </button>

          <div className="mt-25">
            <span className="alert alert-primary">{goatErrorMsg}</span>
          </div>
        </React.Fragment>
      }

      {goatState === 'loading' &&
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

      {goatState === 'loadSuccess' &&
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

export default GoatReducer;
