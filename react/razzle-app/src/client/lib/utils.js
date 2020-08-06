import React, { useState } from 'react';
import { isFunction, isObject } from 'lodash';
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

export const useImmerState = initialState => {
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
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          return target[key];
        }
        console.warn(target);
        throw new Error(`There is no key [${key}] in enum`);
      },
    });

  Object.keys(rootObject).forEach(key => {
    if (isObject(rootObject[key])) {
      rootObject[key] = proxyObject(rootObject[key]);
    }
  });

  return proxyObject(rootObject);
};

export const makeEnum = args =>
  makeUndefinedKeyError(args.reduce((acc, key) => ({ ...acc, [key]: key }), {}));

export const makeActions = actionStrings => {
  const actions = actionStrings.reduce((acc, actionString) => {
    const [, action] = actionString.split('/');
    return {
      ...acc,
      [action]: actionString,
    };
  }, {});

  return makeUndefinedKeyError(actions);
};

export const filterStates = makeEnum(['all', 'completed', 'incomplete']);
export const asyncStates = makeEnum(['idle', 'pending', 'resolved', 'rejected']);
