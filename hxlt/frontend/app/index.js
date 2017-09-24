// Generic
import { map } from 'hexlet-pairs-data'; 
const ilistToString = (log) => {
  map(el => console.log(pairToString(el)), log);
};
window.ilistToString = ilistToString;



















// Chapter 4
// import { cons, car, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
// import { l, length, get } from 'hexlet-pairs-data'; // eslint-disable-line
// import { make as makeSimpleCard } from './4/simpleCard'; // eslint-disable-line
// import { make as makePercentCard } from './4/percentCard'; // eslint-disable-line
// import make from './4/solution'; // eslint-disable-line

// const cards = l(
//   makeSimpleCard('Жесткий ломатель мироздания', 6),
// );
// const game = make(cards);
// const log = game('John', 'Ada');
// console.log(ilistToString(log));

// const cards = l(
//   makeSimpleCard('Ошарашивающие шорты равновесия', 7),
//   makePercentCard('Фаланговая знатность утешения', 80),
// );
// let cardIndex = 1;
// const game = make(cards, (c) => {
//   cardIndex = cardIndex === 0 ? 1 : 0;
//   return get(cardIndex, c);
// });

// const log = game('John', 'Ada');
// console.log(ilistToString(log));



































// Chapter 5
import { car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { l, length, get } from 'hexlet-pairs-data'; // eslint-disable-line
import SimpleCard from './5/simpleCard'; // eslint-disable-line
import PercentCard from './5/percentCard'; // eslint-disable-line
import make from './5/solution'; // eslint-disable-line


// const cards = l(
//   SimpleCard('Королевский хлыст шанса', 6),
// );
// const game = make(cards);
// const log = game('John', 'Ada');
// ilistToString(log);

let cardIndex = 2;
const cards = l(
  SimpleCard('Бул-Катосова награда издёвки', 7),
  PercentCard('Покрытый царапинами клык демона коряги', 80),
);
const game = make(cards, (c) => {
  cardIndex = cardIndex === 0 ? 1 : 0;
  return get(cardIndex, c);
});
const log = game('John', 'Ada');
ilistToString(log);
