import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { definer } from './generic'; // eslint-disable-line
import { attach } from './type'; // eslint-disable-line

const defmethod = definer('SimpleCard');

const make = (name, damage) => attach('SimpleCard', cons(name, damage));
export default make;

defmethod('getName', (self) => car(self));
defmethod('damage', (self) => cdr(self));
// END
