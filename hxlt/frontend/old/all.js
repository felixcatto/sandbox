// Collections
т.е. мне надо 
* переводить обекты в функцию фильтрации (аргумент .filter)
* применять по очереди .filter с разными функциями к коллекции
class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  // BEGIN (write your solution here)
  where(...params) {
    const action = (coll) => {
      const paramsReducer = (acc, param) => {
        if (typeof param === 'function') {
          return acc.filter(param);
        }

        return acc.filter(collEl => Object.keys(param).every(key => param[key] === collEl[key]));
      };
      return params.reduce(paramsReducer, coll);
    };
    return this.build(action);
  }
  // END

  get length() {
    return this.toArray().length;
  }

  toArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }
}

cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
coll = new Enumerable(cars);

const r2 = coll.where({ brand: 'bmw' });














cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
function objectify(list, func) {
  const result = {};
  list.forEach((el) => {
    const key = func(el);
    result[key] = el;
  });
  return result;
}
objectify(cars, ({ model }) => model);




const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
function getCarsCountByYear(list) {
  const keys = list.map(({ year }) => year);
  const reducer = (acc, key) => {
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  };

  return keys.reduce(reducer, {});
}
console.log(getCarsCountByYear(cars));
//  {
//    2010: 1,
//    2012: 1,
//    2013: 1,
//    2014: 2,
//  };











// Prototypes #1
Реализуйте и экспортируйте по умолчанию функцию buildHtml, 
которая возвращает строковое представление html.

tagName,

tagName, attributes <Object>,
tagName, body <String>,
tagName, children <Array>,

tagName, attributes,          body,
tagName, attributes,          children,

tagName, attributes,          body,     children,



function buildHtml(data) {
  const isChildren = arg => arg instanceof Array;
  const isAttributes = arg => arg instanceof Object && !(arg instanceof Array);
  const isBody = arg => typeof arg === 'string';
  const makeAttributeString = obj => Object.keys(obj).map(key => `${key}="${obj[key]}"`).join(' ');
  const makeChildrenString = tags => tags.map(tag => makeTag(tag)).join('');

  const makeTag = (args) => {
    const argsLength = args.length;
    if (argsLength === 1) {
      const [tagName] = args;
      return `<${tagName}></${tagName}>`;
    } else if (argsLength === 2) {
      const el = args[1];
      if (isBody(el)) {
        const [tagName, body] = args;
        return `<${tagName}>${body}</${tagName}>`;
      } else if (isAttributes(el)) {
        const [tagName, attributes] = args;
        const attrString = makeAttributeString(attributes);
        return `<${tagName} ${attrString}></${tagName}>`;
      } else if (isChildren(el)) {
        const [tagName, children] = args;
        const childrenString = makeChildrenString(children);
        return `<${tagName}>${childrenString}</${tagName}>`;
      } else {
        return console.log('something going wrong...');
      }
    } else if (argsLength === 3) {
      const el = args[2];
      if (isBody(el)) {
        const [tagName, attributes, body] = args;
        const attrString = makeAttributeString(attributes);
        return `<${tagName} ${attrString}>${body}</${tagName}>`;
      } else if (isChildren(el)) {
        const [tagName, attributes, children] = args;
        const attrString = makeAttributeString(attributes);
        const childrenString = makeChildrenString(children);
        return `<${tagName} ${attrString}>${childrenString}</${tagName}>`;
      } else {
        return console.log('something going wrong...');
      }
    } else if (argsLength === 4) {
      const [tagName, attributes, body, children] = args;
      const attrString = makeAttributeString(attributes);
      const childrenString = makeChildrenString(children);
      return `<${tagName} ${attrString}>${body}${childrenString}</${tagName}>`;
    } else {
      return console.log('something going wrong...');
    }
  };

  return makeTag(data);
}

const data = ['html', [
  ['meta', [
    ['title', 'hello, hexlet!'],
  ]],
  ['body', { class: 'container' }, [
    ['h1', { class: 'header' }, 'html builder example'],
    ['div', [
      ['span', 'span text2'],
      ['span', 'span text3'],
    ]],
  ]],
]];

const data2 = ['html', [
  ['meta', 'vasa eto boroda'],
]];

const data3 = ['html', 'vasa eto boroda'];

const data4 = ['html', [
  ['h1', { class: 'header' }, 'html builder example']
]];

const data5 = ['html', { class: 'header' }, 'html builder example'];

buildHtml(data);






// Prototypes #2

parse возвращает ast дерево
ast нормализует теги, описанные в dsl, чтобы не пришлось ифами проверять наличие елементов
render рендит ast => html

tagName,
tagName, attributes <Object>,
tagName, body <String>,
tagName, children <Array>,
tagName, attributes,          body,
tagName, attributes,          children,
tagName, attributes,          body,     children,


const singleTagsList = new Set(['hr', 'img', 'br']);
const data = ['html', [
  ['meta', { id: 'uniq-key' }, [
    ['title', 'hello, hexlet!'],
  ]],
  ['body', [
    ['br'],
  ]],
]];

// Полиморфизм подтипов в действии, вызов разного кода, для разных типов
// но смысл действия один и тот же. И не надо городить кучу ифов по всему коду.

// т.е. есть надтип - Тег
// есть подтипы ПарныйТег, ОдиночныйТег.
// их можно добавить, удалить, распечатать в строку...
// т.е. данные (внутренне представление) разные, реализация этих методов разная
// но смысл действий один и тот же.
// Поэтому вместо того, чтобы постоянно проверять тип и вызывать для этого типа разную реализацию
// мы пишем 
// const tag = getSomeTag()
// tag.toString()
// ...


const tagArgToActionMap = [
  {
    prop: 'body',
    check: arg => typeof arg === 'string',
    process: tagEl => tagEl,
  },
  {
    prop: 'attributes',
    check: arg => arg instanceof Object && !(arg instanceof Array),
    process: tagEl => tagEl,
  },
  {
    prop: 'children',
    check: arg => arg instanceof Array,
    process: children => children.map(parse),
  },
];
const tagArgToAction = arg => tagArgToActionMap.find(el => el.check(arg));

function parse(tagEls) {
  const [name, ...rest] = tagEls;
  const tag = {
    name: name,
    attributes: {},
    body: '',
    children: [],
  };
  rest.forEach((tagEl) => {
    const tagAction = tagArgToAction(tagEl);
    tag[tagAction.prop] = tagAction.process(tagEl);
  });
  return tag;
}

function render(astTag) {
  const makeAttributeString = obj => Object.keys(obj).map(key => ` ${key}="${obj[key]}"`).join('');
  const makeChildrenString = tags => tags.map(tag => makeString(tag)).join('');
  const makeString = (astTag) => {
    const attrString = makeAttributeString(astTag.attributes);
    if (singleTagsList.has(astTag.name)) {
      return `<${astTag.name}${attrString}>`
    }

    if (astTag.children.length === 0) {
      return `<${astTag.name}${attrString}>${astTag.body}</${astTag.name}>`;
    }

    const childrenString = makeChildrenString(astTag.children);
    return `<${astTag.name}${attrString}>${childrenString}</${astTag.name}>`;
  };
  return makeString(astTag);
}


const ast = parse(data);
const html = render(ast);
console.log(ast);
console.log(html);

















// Teacher solution
const singleTagsList = new Set(['hr', 'img', 'br']);
const render = ({ name, attributes, body, children }) => {
  const attrsLine = Object.keys(attributes)
    .map(key => ` ${key}="${attributes[key]}"`).join('');
  const content = children.length > 0 ? children.map(render).join('') : body;

  if (singleTagsList.has(name)) {
    return `<${name}${attrsLine}>`;
  }

  return `<${name}${attrsLine}>${content}</${name}>`;
};

const propertyActions = [
  {
    name: 'body',
    check: arg => typeof arg === 'string',
    process: identity,
  },
  {
    name: 'children',
    check: arg => arg instanceof Array,
    process: (children, f) => children.map(f),
    // process: (children) => children.map(parse),
  },
  {
    name: 'attributes',
    check: arg => arg instanceof Object,
    process: identity,
  },
];

const getPropertyAction = arg => find(propertyActions, ({ check }) => check(arg));

const parse = (data) => {
  const [first, ...rest] = data;
  const root = { name: first, attributes: {}, body: '', children: [] };
  return rest.reduce((acc, arg) => {
    const { name, process } = getPropertyAction(arg);
    return { ...acc, [name]: process(arg, parse) };
    // return { ...acc, [name]: process(arg) };
  }, root);
};







// Explanation
т.е. что я изначально хотел, чтобы передать какой-то функции аргумент, а она мне вернула
проперти для этого аргумента
  tagArgumentToProp(arg) {
    if (isAttributes) {
      return 'attributes';
    } else if (isBody) {
      return 'body';
    } else if (isChildren) {
      return 'children'
    }
  }


т.е. аругмент то не может быть ключом обьекта, (строка, массив, обьект)
  {

  }


и поэтому мы мутим массив обектов с check функциями
  const isChildren = arg => arg instanceof Array;
  const isAttributes = arg => arg instanceof Object && !(arg instanceof Array);
  const isBody = arg => typeof arg === 'string';
  const tagArgToProperty = [
    {
      prop: 'body',
      check: arg => typeof arg === 'string',
    },
    {
      prop: 'attributes',
      check: arg => arg instanceof Object && !(arg instanceof Array),
    },
    {
      prop: 'children',
      check: arg => arg instanceof Array,
    },
  ]


и функцию над всем этим 
  getProp = arg => tagArgToProperty.find(el => el.check(arg));


получаем
  const propAction = getPropAction(tagEl);
  tag[propAction.prop] = tagEl;


но самый прикол в том, что по хорошему нам нужен не только проп нейм,
но и его значение, т.е. в некоторых случаях мы хотим как-то обработать значение tagEl
а не просто сохранить его по нужному проп нейму.
  const tagArgToProperty = [
    {
      prop: 'body',
      check: arg => typeof arg === 'string',
      process: tagEl => tagEl,
    },
    {
      prop: 'attributes',
      check: arg => arg instanceof Object && !(arg instanceof Array),
      process: tagEl => tagEl,
    },
    {
      prop: 'children',
      check: arg => arg instanceof Array,
      process: children => children.map(parse),
    },
  ]


Самый прикол в том, что тип данных сам знает как обработать входящий аргумент.
Т.е. мы просто вызываем process(tagEl) и получаем то, что должно лежать в нужной проперти оО





















// Prototypes #3
buildNode.js
Реализуйте и экспортируйте функцию по умолчанию, задача которой, создавать объект подходящего типа. Типы: SingleTag и PairedTag. Список имен тегов, которые относятся к SingleTag: hr, br, img.

PairedTag.js, SingleTag.js
Реализуйте типы тегов со следующим интерфейсом:

Конструктор, который принимает на вход: name, attributes, body, children.
Метод toString, который возвращает текстовое представление узла (html) на всю глубину.
{ name, attributes, body, children }


const data = ['html', [
  ['meta', { id: 'uniq-key' }, [
    ['title', 'hello, hexlet!'],
  ]],
  ['body', [
    ['br'],
  ]],
]];


class SingleTag {
  constructor(name, attributes, body, children) {
    this.name = name;
    this.attributes = attributes;
  }

  getAttributeString() {
    return Object.keys(this.attributes).map(key => ` ${key}="${this.attributes[key]}"`).join('');
  }

  toString() {
    return `<${this.name}${this.getAttributeString()}>`;
  }
}
class PairedTag {
  constructor(name, attributes, body, children) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    this.children = children;
  }

  getAttributeString() {
    return Object.keys(this.attributes).map(key => ` ${key}="${this.attributes[key]}"`).join('');
  }

  getChildernString() {
    return this.children.map(el => el.toString()).join('');
  }

  toString() {
    return `<${this.name}${this.getAttributeString()}>${this.body}${this.getChildernString()}</${this.name}>`;
  }
}


const singleTagsList = new Set(['hr', 'img', 'br']);
function buildNode({ name, attributes, body, children }) {
  if (singleTagsList.has(name)) {
    return new SingleTag(name, attributes, body, children);
  }

  return new PairedTag(name, attributes, body, children);
}


const tagArgToActionMap = [
  {
    prop: 'body',
    check: arg => typeof arg === 'string',
    process: tagEl => tagEl,
  },
  {
    prop: 'attributes',
    check: arg => arg instanceof Object && !(arg instanceof Array),
    process: tagEl => tagEl,
  },
  {
    prop: 'children',
    check: arg => arg instanceof Array,
    process: (children, f) => children.map(f),
  },
];
const tagArgToAction = arg => tagArgToActionMap.find(el => el.check(arg));
function parse(tagEls) {
  const [name, ...rest] = tagEls;
  const tag = {
    name: name,
    attributes: {},
    body: '',
    children: [],
  };
  rest.forEach((tagEl) => {
    const tagAction = tagArgToAction(tagEl);
    tag[tagAction.prop] = tagAction.process(tagEl, parse);
  });
  return buildNode(tag);
}


const nodes = parse(data);
nodes.toString();































// HTTP
telnet host port

HEAD / HTTP/1.0
user-agent: google-chrome


HEAD / HTTP/1.1
host: google.com


GET / HTTP/1.1
host: hexlet.local
connection: close



Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080. Параметры запроса: глагол post, страница /upload, протокол http 1.1, тело: my request body. Не забудьте установить заголовки необходимые для отправки body;
Запишите ваш request в файл solution;

POST /upload HTTP/1.1
host: hexlet.local
content-type: text/plain
content-length: 15

my request body







Выполните авторизацию на сайте hexlet.local (расположен на localhost:8080). Для этого отправьте следующие данные формы: username со значением admin, password со значением secret на урл /session/new. Используйте глагол post и тип application/x-www-form-urlencoded;
Запишите ваш request в файл solution;


POST /session/new HTTP/1.1
host: hexlet.local
content-type: application/x-www-form-urlencoded
content-length: 40

username=admin&password=secret









Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080.
Параметры запроса: глагол get, страница /stream, протокол http 1.1;
Запишите ваш request в файл solution;

GET /stream HTTP/1.1
host: hexlet.local
Transfer-Encoding: chunked









Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080.

Передайте в строке запроса следующие параметры: 
key равный value и another_key равный another_value. 

Параметры запроса: глагол get, страница /, протокол http 1.1;
Запишите ваш request в файл solution;



GET /?key=value&another_key=another_value HTTP/1.1
host: hexlet.local













Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080.
Параметры запроса: глагол post, страница /session/new, протокол http 1.1;
Запишите ваш request в файл solution;

POST /session/new HTTP/1.1
host: hexlet.local








Используя telnet авторизуйтесь на hexlet.local:8080 (расположен на localhost).
Параметры запроса: глагол get, страница /admin, протокол http 1.1, 
  имя пользователя Aladdin, пароль open sesame;
Запишите ваш request в файл solution;

GET /admin HTTP/1.1
host: hexlet.local
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==





Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080.
Параметры запроса: глагол get, страница /account, протокол http 1.1,
  куки name со значением user и secret со значением secret_hash;
Запишите ваш request в файл solution;

GET /account HTTP/1.1
host: hexlet.local
cookie: name=user; secret=secret_hash; 





















// Async 2
diff.js
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает два файла построчно. Сигнатура функции: (path1, path2, callback), где path1 и path2 — пути до первого и второго файла соответственно, а callback — это функция, которая будет вызвана после проведения сравнения. Сигнатура функции callback - (err, data).

Результатом функции, который будет передан в коллбек, является массив, каждый элемент которого состоит из двух элементов. Первый — это строчка из первого файла, второй — это соответствующая строчка из второго. Если строки совпадают, то они не попадают в результат. Если в одном из файлов строка отсутствует, то в массиве подставляется null. Подробнее в примере:

diff('fixtures/file4', 'fixtures/file5', (err, data) => {
  console.log(data);
  // [['text', 'ext'], ['', 'haha'], ['ehu', ''], ['', 'text'], ['aha', null]];
});

Подсказки
Данные, которые читаются из файла, преобразуются к строке используя метод toString.
Альтернативный способ, это передача в readFile вместо двух, три аргумента. Подробнее можно посмотреть в документации.
