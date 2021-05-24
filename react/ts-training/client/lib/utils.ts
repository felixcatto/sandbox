import React, { useState } from 'react';
import { isFunction, isObject, has } from 'lodash-es';
import produce from 'immer';

export const useMergeState = initialState => {
  const [state, setState] = useState(initialState);

  const oldState = React.useRef();
  oldState.current = state;

  const setMergeState = React.useRef(newState =>
    setState({
      ...oldState.current,
      ...newState,
    })
  );

  return [state, setMergeState.current];
};

type ISetImmerState<State> = (fnOrObject: Partial<State> | ((i: State) => void)) => void;
type IUseImmerState = <State>(initialState: State) => [State, ISetImmerState<State>];

export const useImmerState: IUseImmerState = initialState => {
  const [state, setState] = useState(initialState);

  const oldState = React.useRef();
  oldState.current = state;

  const setImmerState = React.useRef(fnOrObject => {
    if (isFunction(fnOrObject)) {
      const fn = fnOrObject;
      setState(produce(oldState.current, fn));
    } else {
      const newState = fnOrObject;
      setState({
        ...oldState.current,
        ...newState,
      });
    }
  });

  return [state, setImmerState.current];
};

export const makeUndefinedKeyError = rootObject => {
  const proxyObject = object =>
    new Proxy(object, {
      get(target, key) {
        if (has(target, key)) {
          return target[key];
        }
        console.warn(target);
        throw new Error(`There is no key [${String(key)}] in enum`);
      },
    });

  Object.keys(rootObject).forEach(key => {
    if (isObject(rootObject[key])) {
      rootObject[key] = proxyObject(rootObject[key]);
    }
  });

  return proxyObject(rootObject);
};

type IMakeEnum = <T extends readonly string[]>(args: T) => { [key in typeof args[number]]: key };
export const makeEnum: IMakeEnum = args =>
  makeUndefinedKeyError(args.reduce((acc, key) => ({ ...acc, [key]: key }), {}));

export const asyncStates = makeEnum(['idle', 'pending', 'resolved', 'rejected'] as const);
