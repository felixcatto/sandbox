import React, { useReducer } from 'react';
import cn from 'classnames';
import ss from './Goat.local.scss';


const initialState = {
  goat: null,
  goatError: null,
  goatLoading: false,
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'GOAT_LOAD_REQUEST':
      return {
        goat: null,
        goatError: null,
        goatLoading: true,
      };
    case 'GOAT_LOAD_SUCCESS':
      return {
        goat: action.payload.goatUrl,
        goatError: null,
        goatLoading: false,
      };
    case 'GOAT_LOAD_ERROR':
      return {
        goat: null,
        goatError: true,
        goatLoading: false,
      };
    default:
      return state;
  }
};

const GoatReducer = (props) => {
  const { goatUrl, sleep } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { goat, goatError, goatLoading } = state;

  const onClick = async () => {
    if (goatLoading) return;

    dispatch({ type: 'GOAT_LOAD_REQUEST' });
    try {
      await sleep(1500);
      dispatch({
        type: 'GOAT_LOAD_SUCCESS',
        payload: { goatUrl },
      });
    } catch (e) {
      dispatch({ type: 'GOAT_LOAD_ERROR' });
    }
  };

  return (
    <div>

      <h1>{`Goat Loader :)`}</h1>

      <button className="btn btn-primary d-inline-flex align-items-center" onClick={onClick}>
        {!goat && !goatLoading && !goatError &&
          <span>Load Goat Now!</span>
        }
        {goatError &&
          <span>Try load again</span>
        }
        {goatLoading &&
          <React.Fragment>
            <span>Loading...</span>
            <div className="spinner-border spinner-border-sm text-light ml-10"></div>
          </React.Fragment>
        }
        {goat &&
          <span>Load Another Goat</span>
        }
      </button>

      <div className="mt-25">
        {goatError &&
          <span className="alert alert-primary">{`Goat fail :'(`}</span>
        }
        {goatLoading &&
          <span className="alert alert-primary">Loading...</span>
        }
      </div>

      {goat &&
        <div className="mt-20">
          <img src={goat} className={ss.image} />
        </div>
      }

    </div>
  );
};

export default GoatReducer;
