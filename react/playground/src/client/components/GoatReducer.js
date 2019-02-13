import React, { useReducer } from 'react';
import cn from 'classnames';
import { getGoatUrl } from '../lib/utils';
import ss from './Goat.local.scss';


const initialState = {
  goatUrl: null,
  goatErrorMsg: null,
  goatLoading: false,
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'GOAT_LOAD_REQUEST':
      return {
        goatUrl: null,
        goatErrorMsg: null,
        goatLoading: true,
      };
    case 'GOAT_LOAD_SUCCESS':
      return {
        goatUrl: action.payload.goatUrl,
        goatErrorMsg: null,
        goatLoading: false,
      };
    case 'GOAT_LOAD_ERROR':
      return {
        goatUrl: null,
        goatErrorMsg: action.payload.goatErrorMsg,
        goatLoading: false,
      };
    default:
      return state;
  }
};

const GoatReducer = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goatUrl, goatErrorMsg, goatLoading } = state;

  const onClick = async () => {
    if (goatLoading) return;

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

      <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
        {!goatUrl && !goatLoading && !goatErrorMsg &&
          <span>Load Goat Now!</span>
        }
        {goatErrorMsg &&
          <span>Try load again</span>
        }
        {goatLoading &&
          <React.Fragment>
            <span>Loading...</span>
            <div className="spinner-border spinner-border-sm text-light ml-10"></div>
          </React.Fragment>
        }
        {goatUrl &&
          <span>Load Another Goat</span>
        }
      </button>

      <div className="mt-25">
        {goatErrorMsg &&
          <span className="alert alert-primary">{goatErrorMsg}</span>
        }
        {goatLoading &&
          <span className="alert alert-primary">Loading...</span>
        }
      </div>

      {goatUrl &&
        <div className="mt-20">
          <img src={goatUrl} className={ss.image} />
        </div>
      }

    </div>
  );
};

export default GoatReducer;
