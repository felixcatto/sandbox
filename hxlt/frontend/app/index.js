import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs';
import { cons as consList, l, random, head, reverse, toString as listToString } from 'hexlet-pairs-data'; 
import { getName as getSimpleCardName, damage as simpleCardDamage } from '../components/simpleCard';
import { getName as getPercentCardName, damage as percentCardDamage } from '../components/percentCard';
import * as itype  from '../components/type';


console.log(pairToString(cons(2,3)));

window.itype = itype;
window.cons = cons;
window.car = car;
window.cdr = cdr;