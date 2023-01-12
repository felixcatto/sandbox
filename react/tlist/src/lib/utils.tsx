import React from 'react';
import { compile } from 'path-to-regexp';

export const Context: any = React.createContext(null);
export const useContext: any = () => React.useContext(Context);

export function makeUrlFor<T>(rawRoutes: T) {
  const routes = Object.keys(rawRoutes).reduce(
    (acc, name) => ({ ...acc, [name]: compile(rawRoutes[name]) }),
    {} as any
  );

  return (name: keyof T, args = {}, opts = {}) => {
    const toPath = routes[name];
    return toPath(args, opts);
  };
}

export const routes = {
  home: '/',
  users: '/users',
  user: '/users/:id',
  todos: '/todos',
  todo: '/todos/:id',
};

export const getApiUrl = makeUrlFor(routes);

type IMakeEnumResult<T extends ReadonlyArray<string>> = { [key in T[number]]: key };

export function makeEnum<T extends ReadonlyArray<string>>(...args: T): IMakeEnumResult<T> {
  return args.reduce((acc, key) => ({ ...acc, [key]: key }), {} as IMakeEnumResult<T>);
}
