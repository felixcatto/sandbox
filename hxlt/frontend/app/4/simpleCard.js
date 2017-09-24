import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs';
import { attach, contents } from './type';

export const make = (name, damage) =>
  attach('SimpleCard', cons(name, damage));

export const getName = self => car(contents(self));

export const damage = self => cdr(contents(self));
