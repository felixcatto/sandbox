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

var has = (list, el) => {
    const iter = (list, el) => {
        if (isEmpty(list)) {
            return false;
        }
        if (head(list) === el) {
            return true;
        }
        const newList = tail(list);
        return iter(newList, el);
    };
    return iter(list, el);
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

var copy = list => {
    const iter = (acc, list) => {
        if (isEmpty(tail(list))) {
            return cons(head(list), acc);
        }
        const newAcc = cons(head(list), acc);
        const newList = tail(list);
        return iter(newAcc, newList);
    };
    const reversedList = iter(null, list);
    return reverse(reversedList);
};

var complexAppend = (la, lb) => {
    const fillStack = (stack, list) => {
        if (isEmpty(list)) return stack;
        if (isEmpty(tail(list))) return stack.push(head(list));
        stack.push(head(list));
        const newList = tail(list);
        return fillStack(stack, newList);
    };
    const iappend = (acc, stack) => {
        if (stack.isEmpty()) {
            return acc;
        }
        const newAcc = cons(stack.pop(), acc);
        return iappend(newAcc, stack);
    };
    const laStack = fillStack(new Stack(), la);
    const lbCopy = copy(lb);
    return iappend(lbCopy, laStack);
};


var appendRec = (list1, list2) => {
  if (isEmpty(list1)) {
    return list2;
  }
  return cons(head(list1), append(tail(list1), list2));
};













// make - конструктор.
// node - создает новый тег. Содержит два элемента, имя тега и его содержимое.
// append - добавляет элемент в список.
// toString - возвращает текстовое представление html
// import { cons, car, cdr } from 'hexlet-pairs';
// import { l, isEmpty, head, tail, cons as consList } from 'hexlet-pairs-data';
// import { make, append, toString, node } from './solution';

// const dom1 = make();
// const dom2 = append(dom1, node('h1', 'hello, world'));
// const dom = append(dom2, node('h2', 'header2'));

// // <h1>hello, world</h1><h2>header2</h2>
// toString(dom);
// var dom =
//                 (vasa,
//                     (eto,
//                         (boroda, null)));
// var dom =
//                 (node,
//                     (node,
//                         (node, null)));
// var dom1 = append(dom, node) => cons(node, dom);


var make = () => l();
var node = (tag, content) => cons(tag, content);
var append = (dom, node) => cons(node, dom);
var nodeName = node => car(node);
var nodeValue = node => cdr(node);
var tsd = elements => {
  if (isEmpty(elements)) {
    return '';
  }
  const element = head(elements);
  const tag = nodeName(element);
  return `${tsd(tail(elements))}<${tag}>${nodeValue(element)}</${tag}>`;
};












// import { make, append, node, value, is } from 'hexlet-html-tags';

// const dom1 = make();
// const dom2 = append(dom1, node('h1', 'scheme'));
// const dom3 = append(dom2, node('p', 'is a lisp'));

// const processedDom = map((element) => {
//   if (is('h1', element)) {
//     return node('h2', value(element));
//   }
//   return element;
// }, dom3);

// import { make, append, node, value, is } from 'hexlet-html-tags';

// const dom1 = make();
// const dom2 = append(dom1, node('h1', 'scheme'));
// const dom3 = append(dom2, node('p', 'is a lisp'));

// // <h1>emehcs</h1>
// // <p>psil a si</p>
// toString(mirror(dom3));
var reverseStr = str => str.split('').reverse().join('');
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
var mirror = (flatList) => {
    return map(inode => node(nodeName(inode), reverseStr(nodeValue(inode))), flatList);
}



















// import { node, append, make, filter } from 'hexlet-html-tags';

// const html1 = append(make(), node('h1', 'header1'));
// const html2 = append(html1, node('h1', 'header2'));
// const html3 = append(html2, node('p', 'content'));

// const processedHtml = filter((element) =>
//   !is('h1', element), html3);

// //<p>content</p>
// toString(processedHtml);

// import { toString } from 'hexlet-pairs-data';
// import { make, append, node } from 'hexlet-html-tags';

// var dom1 = make();
// var dom2 = append(dom1, node('h1', 'scheme'));
// var dom3 = append(dom2, node('p', 'is a lisp'));
// var dom4 = append(dom3, node('blockquote', 'live is live'));
// var dom5 = append(dom4, node('blockquote', 'i am sexy, and i know it'));
// toString(quotes(dom5)); // ('i am sexy, and i know it', 'live is live');




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
}

var quotes = dom => {
    const result = l();
    const filtered = filter(inode => nodeName(inode) == 'blockquote', dom);
    const mapped = map(inode => nodeValue(inode), filtered);
    return mapped;
}

var tsl = list => {
    const iter = (acc, list) => {
        if (isEmpty(tail(list))) {
            return acc + head(list) + ')';
        }
        const newAcc = acc + head(list) + ', ';
        const newList = tail(list);
        return iter(newAcc, newList);
    };
    return iter('(', list);
};






















// import { node, append, make, reduce } from 'hexlet-html-tags';

// const html1 = append(make(), node('h1', 'header1'));
// const html2 = append(html1, node('h1', 'header2'));
// const html3 = append(html2, node('p', 'content'));


// import { toString } from 'hexlet-pairs-data';
// import { make, append, node } from 'hexlet-html-tags';

// const html1 = make();
// const html2 = append(html1, node('h1', 'scheme'));
// const html3 = append(html2, node('p', 'is a lisp'));
// const html4 = append(html3, node('blockquote', ''));
// const html5 = append(html4, node('blockquote', ''));
// const html6 = append(html5, node('blockquote', 'quote'));



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

var emptyTagsCount = (tagType, collection) => {
    return reduce((el, acc) => {
        return nodeName(el) == tagType && nodeValue(el) == '' ? acc + 1 : acc
    }, 0, collection);
};

















// import { node, append, make, reduce } from 'hexlet-html-tags';

var html10 = append(make(), node('h2', 'header1'));
var html11 = append(html10, node('h2', 'header2'));
var html12 = append(html11, node('p', 'content'));

// // <p>header1</p><p>header2</p>
// toString(extractHeaders(html3));

// import { make, append, node } from 'hexlet-html-tags';

var html1 = append(make(), node('h2', 'header1 lisp'));
var html2 = append(html1, node('p', 'content'));
var html3 = append(html2, node('h2', 'lisp header2 lisp'));
var html4 = append(html3, node('p', 'content lisp'));

// wordsCount('h2', 'lisp', html4); // 3


var extractHeaders = collection => {
    const filtered = filter(inode => nodeName(inode) == 'h2', collection);
    const mapped = map(inode => node('p', nodeValue(inode)), filtered);
    return mapped;
};

var wc = (word, text) => {
  const re = new RegExp(word, 'g');
  return (text.match(re) || []).length;
};

var wordsCount = (tag, word, collection) => {
    const filtered = filter(inode => nodeName(inode) == tag, collection);
    // const func = (el, acc) => append(acc, nodeValue(el));
    // const reduced = reduce(func, l(), filtered);
    const mapped = map(inode => nodeValue(inode), filtered);
    const reduced = reduce(
        (el, acc) => acc + wc(word, el),
        0,
        mapped
    );
    return reduced;
}



















// <h1>scheme</h1>
// <p>is a lisp</p>
// <ul>
//     <li>item 1</li>
//     <li>item 2</li>
// </ul>
// <ol>
//     <li>item 1</li>
//     <li>item 2</li>
// </ol>
// <p>
//     is a functional lang
// </p>
// <ul>
//     <li>item</li>
// </ul>
// <div>
//     <p>text</p>
// </div>
// <div>
//     <div>
//         <p>text</p>
//     </div>
// </div>
// <h1>prolog</h1>
// <p>is about logic</p>
// Тогда:

var dom1 = make(); // Список нод, то есть это лес, а не дерево
var dom2 = append(dom1, node('h1', 'scheme'));
var dom3 = append(dom2, node('p', 'is a lisp'));

var children1 = l(node('li', 'item 1'), node('li', 'item 2'));
var dom4 = append(dom3, node('ul', children1));
var children2 = l(node('li', 'item 1'), node('li', 'item 2'));
var dom5 = append(dom4, node('ol', children2));
var dom6 = append(dom5, node('p', 'is a functional language'));
var children3 = l(node('li', 'item'));
var dom7 = append(dom6, node('ul', children3));
var dom8 = append(dom7, node('div', l(node('p', 'text'))));
var dom9 = append(dom8, node('div', l(node('div', l(node('p', 'text'))))));

var dom10 = append(dom9, node('h1', 'prolog'));
var dom = append(dom10, node('p', 'is about logic'));

// select(l('ul', 'li'), dom);
// // [('li', 'item 1'), ('li', 'item 2'), ('li', 'item')]

// select(l('div', 'div', 'p'), dom);
// // [('p', 'text')]

// select(l('p'), dom));
// // [('p', 'is a lisp'), ('p', 'is a functional language'),
// //  ('p', 'text'), ('p', 'text), ('p', 'is about logic')]




var ws = n => {
    const iter = (acc, n) => {
        if (n == 0) return acc;
        return iter(acc + ' ', n - 1);
    }
    return iter('', n);
}

// incorrect work on inner elements. Need revert
var tsdr = (collection, indent = 0) => {
    const fillStack = (stack, collection) => {
        if (isEmpty(tail(collection))) {
            return stack.push(head(collection));
        }
        stack.push(head(collection));
        const newCollection = tail(collection);
        return fillStack(stack, newCollection);
    };

    const iter = (acc, stack) => {
        if (stack.isEmpty()) {
            return acc;
        }
        const el = stack.pop();
        const tag = nodeName(el);
        if (typeof tail(el) == 'function') {
            const innerCollection = tail(el);
            acc += `${ws(indent)}<${tag}>\n`;
            acc += tsdr(innerCollection, indent + 4);
            acc += `${ws(indent)}</${tag}>\n`;
            return iter(acc, stack);
        }
        else {
            acc += `${ws(indent)}<${tag}>${nodeValue(el)}</${tag}>\n`;
            return iter(acc, stack);
        }
    };

    const collectionStack = fillStack(new Stack(), collection);
    const str = iter('', collectionStack);
    return str;
};





















var select = (queryTags, dom) => {
    const iter = (acc, queryTags, dom) => {
        if (isEmpty(dom)) {
            return acc;
        }
        const queryTag = head(queryTags);
        const restOfQueryTags = tail(queryTags);
        const el = head(dom);
        if (typeof tail(el) == 'function') {
            let newAcc,
                innerCollection = tail(el);
            if (queryTag == nodeName(el) && !isEmpty(restOfQueryTags)) {
                newAcc = iter(acc, restOfQueryTags, innerCollection);
            }
            else if (queryTag == nodeName(el) && isEmpty(restOfQueryTags)) {
                newAcc = iter(append(acc, el), queryTags, innerCollection);
            }
            else if (queryTag != nodeName(el)) {
                newAcc = iter(acc, queryTags, innerCollection);
            }
            return iter(newAcc, queryTags, tail(dom));
        }
        else {
            if (queryTag == nodeName(el) && isEmpty(restOfQueryTags)) {
                const newAcc = append(acc, el);
                return iter(newAcc, queryTags, tail(dom));
            }
            else {
                return iter(acc, queryTags, tail(dom));
            }
        }
    };

    const list = iter(l(), queryTags, dom);
    return list;
};






















list1 = l(2, 3, 2, 1, 7);
list2 = l(1, 5, 3, 5, 8, 9);

// const result = union(list1, list2);
// // (2, 3, 1, 7, 5, 8, 9)

var union = (l1, l2) => {
    const iter = (acc, iterlist) => {
        if (isEmpty(iterlist)) {
            return acc;
        }
        const el = head(iterlist);
        const newIterList = tail(iterlist);
        if (has(acc, el)) {
            return iter(acc, newIterList);
        }
        else {
            newAcc = append(acc, el);
            return iter(newAcc, newIterList);
        }
    }
    return iter(iter(l(), l1), l2);
};



var union = (l1, l2) => {
    const func = (el, acc) => has(acc, el) ? acc : append(acc, el);
    const uniq1 = reduce(func, l(), l1);
    const uniq2 = reduce(func, uniq1, l2);
    return reverse(uniq2);
};






















// Напишите и экспортируйте функцию zip, которая принимает на вход два списка и возвращает третий, в котором каждый элемент это список элементов исходных списков, стоящих на тех же позициях.

list1 = l(1, 5, 3, 8, 9);
list2 = l(2, 3, 2, 1);

// //  ((1, 2), (5, 3), (3, 2), (8, 1))
// const result = zip(list1, list2);
// Длина результирующего списка равна длине короткого списка.


var zip = (l1, l2) => {
    const iter = (acc, l1, l2) => {
        if (isEmpty(l1) || isEmpty(l2)) {
            return reverse(acc);
        }
        const el1 = head(l1);
        const el2 = head(l2);
        const pseudoNode = l(el1, el2);
        const newAcc = cons(pseudoNode, acc);
        return iter(newAcc, tail(l1), tail(l2));
    };
    return iter(l(), l1, l2);
};





// const iter = (acc, collection) => {
//     if (isEmpty(collection)) {
//         return acc;
//     }
//     const el = head(collection);
//     if (compareFunc(el, bearingEl) > 0) {
//         const newAcc = cons(el, acc);
//         return iter(newAcc, tail(collection));
//     }
//     else {
//         return iter(acc, tail(collection));
//     }
// };
// return iter(l(), collection);









var list1 = l(3, 3, 0, -1, 0, 4, -5);
// sort(l(3, 3, 0, -1, 0, 4, -5));
// (-5, -1, 0, 0, 3, 3, 4)

var sort = (collection) => {
    const partition = (collection, compareFunc) => {
        const bearingEl = head(collection);
        return filter(el => compareFunc(el, bearingEl), collection);
    };
    const partitionHigh = (collection) => {
        const compareFunc = (a, b) => (a > b) ? true : false;
        return partition(collection, compareFunc);
    };
    const partitionMiddle = (collection) => {
        const compareFunc = (a, b) => (a == b) ? true : false;
        return partition(collection, compareFunc);
    };
    const partitionLow = (collection) => {
        const compareFunc = (a, b) => (a < b) ? true : false;
        return partition(collection, compareFunc);
    };
    const quickSort = (acc, collection) => {
        if (isEmpty(collection)) {
            return acc;
        }
        else if (isEmpty(tail(collection))) {
            return cons(head(collection), acc);
        }
        else {
            const high = partitionHigh(collection);
            const middle = partitionMiddle(collection);
            const low = partitionLow(collection);
            const highAcc = quickSort(acc, high);
            const middleAcc = reduce((el, acc) => cons(el, acc), highAcc, middle);
            const lowAcc = quickSort(middleAcc, low);
            return lowAcc;
        }
    };
    return quickSort(l(), collection);
};


// Teacher
// const sort = (list) => {
//   if (isEmpty(list)) {
//     return l();
//   }

//   const divisor = head(list);
//   const rest = tail(list);

//   const left = filter(value => value <= divisor, rest);
//   const right = filter(value => value > divisor, rest);

//   return append(sort(left), cons(divisor, sort(right)));
// };























// take(3, l()); // ()
// take(3, l(1, 2)); // (1, 2)
// take(1, l(7, 2)); // (7)

var take = (count, collection) => {
    const iter = (acc, takenCount, collection) => {
        if (isEmpty(collection) || takenCount === count) {
            return acc;
        }
        const newAcc = cons(head(collection), acc);
        return iter(newAcc, takenCount + 1, tail(collection));
    };
    return reverse(iter(l(), 0, collection));
};







// sameParity(l(-1, 0, 1, -3, 10, -2)); // (-1, 1, -3)
// sameParity(l()); // ()


var sameParity = (collection) => {
    if (isEmpty(collection)) {
        return l();
    }
    const predicate = head(collection) % 2 === 0 ? el => el % 2 === 0 : el => el % 2 !== 0;
    return filter(predicate, collection);
};







// Реализуйте и экспортируйте функцию flatten, которая делает плоским вложенный список.

var list2 = l(1, 2, l(3, 5), l(l(4, 3), 2));

// (1, 2, 3, 5, 4, 3, 2)
var flatten = (collection) => {
    const func = (el, acc) => {
        if (isEmpty(el)) {
            return acc;
        }
        else if (typeof el === 'function') {
            return reduce(func, acc, el);
        }
        else {
            return cons(el, acc);
        }
    };
    return reverse(reduce(func, l(), collection));
};

export const flatten = (list) => {
    const func = (element, acc) =>
            (!isList(element) ? cons(element, acc) : removeList(element, acc))
    const removeList = (elements, accumulator) => reduce(func, accumulator, elements);

  return reverse(removeList(list, l()));
};
