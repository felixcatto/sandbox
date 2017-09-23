import { cons, car, cdr } from 'hexlet-pairs';
import definer from './card';

const defmethod = definer('SimpleCard');

export const make = (name, damagePoints) =>
  cons('SimpleCard', cons(name, damagePoints));

export const damage = (self) => cdr(cdr(self));

defmethod('getName', (self) => car(cdr(self)));

defmethod('damage', (self) => cdr(cdr(self)));
