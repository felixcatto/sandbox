import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { l, cons as consList, isEmpty, head, tail } from 'hexlet-pairs-data'; // eslint-disable-line
import { attach, typeTag, contents } from './type'; // eslint-disable-line

let methods = l();

export const getMethod = (obj, methodName) => {
  // BEGIN (write your solution here)
  const type = typeTag(obj);
  const iter = (methods) => {
    if (isEmpty(methods)) {
      return null;
    }
    const method = head(methods);
    if (typeTag(method) === type && car(contents(method)) === methodName) {
      return cdr(contents(method));
    } else {
      return iter(tail(methods));
    }
  };
  return iter(methods);
  // END
};

export const definer = type =>
  (methodName, f) => {
    methods = consList(attach(type, cons(methodName, f)), methods);
  };
