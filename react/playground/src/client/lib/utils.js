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

export {
  useMachine,
};
