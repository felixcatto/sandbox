import React, { useState } from 'react';
import cn from 'classnames';
import { getGoatUrl } from '../lib/utils';
import ss from './Goat.local.scss';


const GoatState = () => {
  const [goatState, setGoatState] = useState({
    goatUrl: null,
    goatErrorMsg: null,
    goatLoading: false,
  });

  const onClick = async () => {
    setGoatState({
      goatUrl: null,
      goatErrorMsg: null,
      goatLoading: true,
    });

    try {
      const { goatUrl } = await getGoatUrl();

      setGoatState({
        goatUrl,
        goatErrorMsg: null,
        goatLoading: false,
      });
    } catch ({ goatErrorMsg }) {
      setGoatState({
        goatUrl: null,
        goatErrorMsg,
        goatLoading: false,
      });
    }
  };

  const { goatUrl, goatErrorMsg, goatLoading } = goatState;

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

export default GoatState;
