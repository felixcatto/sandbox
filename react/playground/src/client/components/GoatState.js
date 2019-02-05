import React, { useState } from 'react';
import cn from 'classnames';
import ss from './Goat.local.scss';


const GoatState = (props) => {
  const { goatUrl, sleep } = props;

  const [goatState, setGoatState] = useState({
    goat: null,
    goatError: null,
    goatLoading: false,
  });

  const onClick = async () => {
    setGoatState({
      goat: null,
      goatError: null,
      goatLoading: true,
    });

    try {
      await sleep(1500);

      setGoatState({
        goat: goatUrl,
        goatError: null,
        goatLoading: false,
      });
    } catch (e) {
      setGoatState({
        goat: null,
        goatError: true,
        goatLoading: false,
      });
    }
  };

  const { goat, goatError, goatLoading } = goatState;

  return (
    <div>

      <h1>Goat Loader :&#41;</h1>

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
          <span className="alert alert-primary">Goat fail :'&#40;</span>
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

export default GoatState;
