import React, { useState } from 'react';
import cn from 'classnames';
import { getGoatUrl } from '../lib/utils';
import ss from './Goat.local.scss';


const GoatStateDeclarative = () => {
  const [state, setState] = useState({
    goatState: 'idle',
    goatUrl: null,
    goatErrorMsg: null,
  });

  const { goatUrl, goatErrorMsg, goatState } = state;

  const onClick = async () => {
    if (goatState === 'loading') return;

    setState({
      goatState: 'loading',
      goatUrl: null,
      goatErrorMsg: null,
    });

    try {
      const response = await getGoatUrl();

      setState({
        goatState: 'loadSuccess',
        goatUrl: response.goatUrl,
        goatErrorMsg: null,
      });
    } catch (e) {
      setState({
        goatState: 'loadError',
        goatUrl: null,
        goatErrorMsg: e.goatErrorMsg,
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

export default GoatStateDeclarative;
