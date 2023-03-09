import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';


const useMachine = (machine) => {
  // Keep track of the current machine state
  const [current, setCurrent] = useState(machine.initialState);

  // Start the service (only once!)
  const service = useMemo(
    () => interpret(machine)
      .onTransition(state => {
        if (state.changed) {
          setCurrent(state);
        }
      })
      .start(),
    [],
  );

  // Stop the service when the component unmounts
  useEffect(() => {
    return () => service.stop();
  }, []);

  return [current, service.send];
};

const sleep = (ms, successRate = 0.66) => new Promise((resolve, reject) => {
  if (Math.random() < successRate) {
    setTimeout(resolve, ms);
  } else {
    setTimeout(reject, ms);
  }
});

const getGoatUrl = (successRate = 0.66, ms = 1500) => new Promise((resolve, reject) => {
  if (Math.random() < successRate) {
    setTimeout(() => resolve({ goatUrl: '/img/goat2.jpg' }), ms);
  } else {
    setTimeout(() => reject({ goatErrorMsg: 'Bad network :(' }), ms);
  }
});


export {
  useMachine,
  getGoatUrl,
};
