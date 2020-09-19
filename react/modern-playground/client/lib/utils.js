import { isObject, has, isFunction } from 'lodash';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import produce from 'immer';
import { createMachine, interpret, assign } from 'xstate';

export const makeUndefinedKeyError = rootObject => {
  const proxyObject = object =>
    new Proxy(object, {
      get(target, key) {
        if (has(target, key) || key === 'toJSON') {
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

export const NavLink = ({ ...restProps }) => {
  const isActive = ({ isCurrent }) =>
    isCurrent
      ? { className: 'app__nav-link app__nav-link_active' }
      : { className: 'app__nav-link' };
  return <Link getProps={isActive} {...restProps} />;
};

export const PartialNavLink = ({ ...restProps }) => {
  const isActive = ({ isPartiallyCurrent }) =>
    isPartiallyCurrent
      ? { className: 'app__nav-link app__nav-link_active' }
      : { className: 'app__nav-link' };
  return <Link getProps={isActive} {...restProps} />;
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

export const asyncStates = makeEnum(['idle', 'pending', 'resolved', 'rejected']);

export const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

export const getFirstWords = str => {
  const wordMachine = createMachine(
    {
      initial: 'outsideBeforeFW',
      context: { firstWords: [], firstWord: '' },
      states: {
        outsideBeforeFW: {
          on: {
            CHAR: {
              target: 'insideFW',
              cond: 'isWordChar',
              actions: 'accumulateWord',
            },
          },
        },
        insideFW: {
          on: {
            CHAR: [
              {
                target: 'outsideAfterFW',
                cond: 'isWhiteSpace',
                actions: 'storeFirstWord',
              },
              {
                target: 'outsideBeforeFW',
                cond: 'isEndline',
                actions: 'storeFirstWord',
              },
              {
                cond: 'isWordChar',
                actions: 'accumulateWord',
              },
            ],
            END: {
              type: 'final',
              actions: 'storeFirstWord',
            },
          },
        },
        outsideAfterFW: {
          on: {
            CHAR: {
              target: 'outsideBeforeFW',
              cond: 'isEndline',
            },
          },
        },
      },
    },
    {
      actions: {
        accumulateWord: assign(({ firstWord }, { char }) => ({
          firstWord: firstWord + char,
        })),
        storeFirstWord: assign(({ firstWords, firstWord }) => ({
          firstWords: firstWords.concat(firstWord),
          firstWord: '',
        })),
      },
      guards: {
        isWhiteSpace: (ctx, { char }) => char === ' ',
        isWordChar: (ctx, { char }) => char !== ' ' && char !== '\n',
        isEndline: (ctx, { char }) => char === '\n',
      },
    }
  );

  const wordService = interpret(wordMachine).start();
  str.split('').forEach(char => wordService.send({ type: 'CHAR', char }));
  const { context } = wordService.send('END');
  return context.firstWords;
};
