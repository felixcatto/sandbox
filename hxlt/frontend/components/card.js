import * as pairs from 'hexlet-pairs';
import { l, isEmpty, cons, head, tail } from 'hexlet-pairs-data';

let methods = l();

const getMethod = (obj, methodName) => {
  const currentType = pairs.car(obj);
  const iter = (elements) => {
    if (isEmpty(elements)) {
      return null;
    }
    const element = head(elements);
    if (currentType === pairs.car(element)) {
      const method = pairs.cdr(element);
      if (methodName === pairs.car(method)) {
        return pairs.cdr(method);
      }
    }

    return iter(tail(elements));
  };

  return iter(methods);
};

export const getName = (self) => getMethod(self, 'getName')(self);
export const damage = (self, health) => getMethod(self, 'damage')(self, health);

export default (type) =>
  (methodName, f) => {
    methods = cons(pairs.cons(type, pairs.cons(methodName, f)), methods);
  };
