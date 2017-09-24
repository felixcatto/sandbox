import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs';
import { cons as consList, l, random, head, tail, reverse, toString as listToString, length, get, map } from 'hexlet-pairs-data'; 
import {
  getName as getSimpleCardName,
  damage as simpleCardDamage,
  make as makeSimpleCard 
} from './simpleCard';
import {
  getName as getPercentCardName,
  damage as percentCardDamage,
  make as makePercentCard
} from './percentCard';
import { attach, contents, typeTag }  from './type';



const isSimpleCard = card => typeTag(card) === 'SimpleCard';
const isPercentCard = card => typeTag(card) === 'PercentCard';
const run = (player1, player2, cards, customRandom) => {
  const makeLogMsg = (name1, name2, cardName, damage) => 
    `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 < 0 || health2 < 0 ) {
      const logItem = cons(cons(health1, health2), 'The battle is over' );
      return cons(logItem, log);
    }

    const card = customRandom(cards);
    let cardName, damage;
    if (isSimpleCard(card)) {
      cardName = getSimpleCardName(card);
      damage = simpleCardDamage(card);
    } else if (isPercentCard(card)) {
      const health = order === 1 ? health2 : health1;
      cardName = getPercentCardName(card);
      damage = percentCardDamage(card, health);
    }

    if (order === 1) {
      const newHealth2 = health2 - damage;
      const logItem = cons(cons(health1, newHealth2), makeLogMsg(name1, name2, cardName, damage));
      return iter(health1, name1, newHealth2, name2, 2, cons(logItem, log));
    } else {
      const newHealth1 = health1 - damage;
      const logItem = cons(cons(newHealth1, health2), makeLogMsg(name2, name1, cardName, damage));
      return iter(newHealth1, name1, health2, name2, 1, cons(logItem, log));
    }
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};


const make = (cards, customRandom = random) =>
  (name1, name2) =>
    run(name1, name2, cards, customRandom);
export default make;