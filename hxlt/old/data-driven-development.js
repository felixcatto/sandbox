var flog = (func) => console.log(func.toString());


function Stack() {
  this.store = [];
  return this;
}
Stack.prototype.push = function(x) {
  this.store.push(x);
  return this;
};
Stack.prototype.pop = function() {
  return this.store.pop();
};
Stack.prototype.isEmpty = function() {
  return this.store.length === 0;
};

var cons = (x, y) => func => func(x, y);

var car = func => func((x, y) => x);

var cdr = func => func((x, y) => y);

var isEmpty = list => list === null;

var head = list => car(list);

var tail = list => cdr(list);

var consList = (el, list)  => cons(el, list);

var ts = list => {
  const iter = (acc, list) => {
    if (isEmpty(list)) {
      return l();
    }
    else if (isEmpty(tail(list))) {
      return acc + head(list) + ']';
    }
    const newAcc = acc + head(list) + ', ';
    const newList = tail(list);
    return iter(newAcc, newList);
  };
  return iter('[', list);
};

var l = (...args) => {
  const iter = (acc, args) => {
    if (args.length == 0) {
      return acc;
    }
    const newAcc = cons(args[0], acc);
    const newArgs = args.slice(1);
    return iter(newAcc, newArgs);
  };
  return iter(null, args.reverse());
};

var reverse = list => {
  const iter = (acc, list) => {
    if (isEmpty(list)) {
      return null;
    }
    if (isEmpty(tail(list))) {
      return cons(head(list), acc);
    }
    const newAcc = cons(head(list), acc);
    const newList = tail(list);
    return iter(newAcc, newList);
  };
  return iter(null, list);
};

var map = (func, collection) => {
  const fillStack = (stack, list) => {
    if (isEmpty(list)) return stack;
    if (isEmpty(tail(list))) return stack.push(head(list));
    stack.push(head(list));
    const newList = tail(list);
    return fillStack(stack, newList);
  };
  const iter = (acc, stack) => {
    if (stack.isEmpty()) {
      return acc;
    }
    const newAcc = cons(func(stack.pop()), acc);
    return iter(newAcc, stack);
  };
  const nodesStack = fillStack(new Stack(), collection);
  return iter(null, nodesStack);
};

var filter = (func, collection) => {
  const fillStack = (stack, list) => {
    if (isEmpty(list)) return stack;
    if (isEmpty(tail(list))) return stack.push(head(list));
    stack.push(head(list));
    const newList = tail(list);
    return fillStack(stack, newList);
  };
  const iter = (acc, stack) => {
    if (stack.isEmpty()) {
      return acc;
    }
    const el = stack.pop();
    if (func(el)) {
      const newAcc = cons(el, acc);
      return iter(newAcc, stack);
    }
    else {
      return iter(acc, stack);
    }
  };
  const nodesStack = fillStack(new Stack(), collection);
  return iter(null, nodesStack);
};

var reduce = (func, acc, collection) => {
  const iter = (acc, collection) => {
    if (isEmpty(collection)) {
      return acc;
    }
    const el = head(collection);
    const newAcc = func(el, acc);
    return iter(newAcc, tail(collection));
  };
  return iter(acc, collection);
};










var l1 = l(3, -1, 4, -5);


function get(i, seq) {
  if (i === 0) {
    return head(seq);
  }

  return get(i - 1, tail(seq));
}
function length(seq) {
  return reduce(function (n, acc) {
    return acc + 1;
  }, 0, seq);
}
function random(seq) {
  const rAtoB = (a, b)  => Math.floor(Math.random() * (b - a + 1) + a);
  const n = rAtoB(0, length(seq) - 1);
  return get(n, seq);
}





let cardIndex = 0;
var determinedRandom = (cards) => {
  cardIndex = cardIndex === 0 ? 1 : 0;
  return get(cardIndex, cards);
};
var mycards = l(
  cons('vasa the drunken master', () => 2), 
  cons('medved the forest spirit', () => 3),
  cons('bone shovel of doom', () => 6)
);
var mylog = reverse(l(
  cons(cons(10, 10), 'Начинаем бой!'),
  cons(cons(10, 4), 'wow'),
  cons(cons(2, 4), 'yehaa')
));

var printLog = (log) => {
  const func = (el) => {
    const player1 = head(head(el));
    const player2 = tail(head(el));
    const message = tail(el);
    console.log(`${player1}, ${player2}: ${message} \n`);
  };
  map(func, log);
};
var printLogR = (log) => {
  const func = (el) => {
    const player1 = head(head(el));
    const player2 = tail(head(el));
    const message = tail(el);
    console.log(`${player1}, ${player2}: ${message} \n`);
  };
  map(func, reverse(log));
};
var printCard = (card) => `${car(card)} => ${cdr(card)()}`;

// var run = (player1, player2, cards, customRandom) => {
//     const makeLogMsg = (name1, name2, cardName, damage) => 
//         `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
//     const iter = (health1, name1, health2, name2, order, log) => {
//         if (health1 <= 0 || health2 <= 0) {
//             const logMessage = cons(cons(health1, health2), `GGWP`);
//             return consList(logMessage, log);
//         }
//         const card = customRandom(cards);
//         // const card = random(cards);
//         const cardName = head(card);
//         const dmg = tail(card)();
//         if (order === 1) {
//             const newHealth2 = health2 - dmg;
//             const roundResult = makeLogMsg(name1, name2, cardName, dmg);
//             const logMessage = cons(cons(health1, newHealth2), roundResult);
//             const newLog = consList(logMessage, log);
//             return iter(health1, name1, newHealth2, name2, -1, newLog);
//         }
//         else {
//             const newHealth1 = health1 - dmg;
//             const roundResult = makeLogMsg(name2, name1, cardName, dmg);
//             const logMessage = cons(cons(newHealth1, health2), roundResult);
//             const newLog = consList(logMessage, log);
//             return iter(newHealth1, name1, health2, name2, 1, newLog);
//         }
//     };

//     const startHealth = 10;
//     const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
//     return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
// };

























const isSimpleCard = (card) => typeTag(card) === 'SimpleCard';
const isPercentCard = (card) => typeTag(card) === 'PercentCard';

const run = (player1, player2, cards, customRandom) => {
  const makeLogMsg = (name1, name2, cardName, damage) => 
    `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 <= 0 || health2 <= 0) {
      const logMessage = cons(cons(health1, health2), `GGWP`);
      return consList(logMessage, log);
    }
    const card = customRandom(cards);
    // const card = random(cards);
    const cardName = head(card);
    const dmg = tail(card)();
    if (order === 1) {
      const newHealth2 = health2 - dmg;
      const roundResult = makeLogMsg(name1, name2, cardName, dmg);
      const logMessage = cons(cons(health1, newHealth2), roundResult);
      const newLog = consList(logMessage, log);
      return iter(health1, name1, newHealth2, name2, -1, newLog);
    }
    else {
      const newHealth1 = health1 - dmg;
      const roundResult = makeLogMsg(name2, name1, cardName, dmg);
      const logMessage = cons(cons(newHealth1, health2), roundResult);
      const newLog = consList(logMessage, log);
      return iter(newHealth1, name1, health2, name2, 1, newLog);
    }
  };

  const startHealth = 10;
  const logItem = pairs.cons(pairs.cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};





var attach = (tag, data) => cons(tag, data);
var typeTag = taggedData => car(taggedData);
var contents = taggedData => cdr(taggedData);

var PCmake = (name, percent) => attach('PercentCard', cons(name, percent));
var PCgetName = self => car(contents(self));
var PCdamage = (self, health) => Math.round(health * (cdr(contents(self)) / 100));



