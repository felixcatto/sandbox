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
// import { car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
// import { l, length, get } from 'hexlet-pairs-data'; // eslint-disable-line
// import SimpleCard from './5/simpleCard'; // eslint-disable-line
// import PercentCard from './5/percentCard'; // eslint-disable-line
// import make from './5/solution'; // eslint-disable-line


// // const cards = l(
// //   SimpleCard('Королевский хлыст шанса', 6),
// // );
// // const game = make(cards);
// // const log = game('John', 'Ada');
// // ilistToString(log);

// let cardIndex = 2;
// const cards = l(
//   SimpleCard('Бул-Катосова награда издёвки', 7),
//   PercentCard('Покрытый царапинами клык демона коряги', 80),
// );
// const game = make(cards, (c) => {
//   cardIndex = cardIndex === 0 ? 1 : 0;
//   return get(cardIndex, c);
// });
// const log = game('John', 'Ada');
// ilistToString(log);

















// // Chapter 6 
// // dynamic dispatch without virtual tables?
// const make = (name, damage) => 
//   (method) => {
//     if (method === 'getName') {
//       return name;
//     } else if (method === 'damage') {
//       return damage;
//     } else {
//       return 'undefined method';
//     }
//   };
// export default make;

// // BEGIN (write your solution here)
// const cardName = card('getName');
// const points = card('damage', health2);
// // END









// Chapter 7 (Native Objects)
import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { l, length, get } from 'hexlet-pairs-data'; // eslint-disable-line
import simpleCard from './7/simpleCard'; // eslint-disable-line
import percentCard from './7/percentCard'; // eslint-disable-line
import make from './7/solution'; // eslint-disable-line

// const cards = l(
//   simpleCard('Королевский хлыст шанса', 5),
// );
// const game = make(cards);
// const log = game('John', 'Ada');

let cardIndex = 2;
const cards = l(
  simpleCard('Бул-Катосова награда издёвки', 7),
  percentCard('Покрытый царапинами клык демона коряги', 80),
);
const game = make(cards, (c) => {
  cardIndex = cardIndex === 0 ? 1 : 0;
  return get(cardIndex, c);
});
const log = game('John', 'Ada');

window.log = log;
window.car = car;
window.cdr = cdr;
window.get = get;