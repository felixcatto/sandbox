import { cons as consList, l, random, head, reverse, toString as listToString } from 'hexlet-pairs-data'; // eslint-disable-line

const run = (player1, player2, cards, customRandom) => {
  // BEGIN (write your solution here)
  const makeLogMsg = (name1, name2, cardName, damage) => 
    `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
  const iter = (health1, player1, health2, player2, order, log) => {
    if (health1 <= 0 || health2 <= 0) {
      return consList({
        health1,
        health2,
        message: 'The battle is over',
      }, log);
    }

    const card = customRandom(cards);
    if (order === 1) {
      const newHealth2 = health2 - card.damage(health2);
      const logItem = {
        health1,
        health2: newHealth2,
        message: makeLogMsg(player1, player2, card.name, card.damage()),
      };
      return iter(health1, player1, newHealth2, player2, 2, consList(logItem, log));
    } else {
      const newHealth1 = health1 - card.damage(health1);
      const logItem = {
        health1: newHealth1,
        health2,
        message: makeLogMsg(player2, player1, card.name, card.damage()),
      };
      return iter(newHealth1, player1, health2, player2, 1, consList(logItem, log));
    }
  };
  // END

  const startHealth = 10;
  const logItem = {
    health1: startHealth,
    health2: startHealth,
    message: 'Начинаем бой!',
  };
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default (cards, customRandom = random) =>
  (name1, name2) =>
    run(name1, name2, cards, customRandom);
