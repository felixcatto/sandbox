import { cons, car, cdr, toString } from 'hexlet-pairs';
import definer from './card';

const defmethod = definer('PercentCard');

export const make = (name, percent) =>
  cons('PercentCard', cons(name, percent));

defmethod('getName', (self) => car(cdr(self)));

defmethod('damage', (self, health) =>
  Math.round(health * (cdr(cdr(self)) / 100)));
