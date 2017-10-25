// Collections

class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
    this.memo = null;
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  select(fn) {
    return this.build(coll => coll.map(fn));
  }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);
      const compareResult = direction === 'asc' ? 1 : -1;
      if (a1 > b1) {
        return compareResult;
      } else if (a1 < b1) {
        return -compareResult;
      }

      return 0;
    };
    return this.build(coll => coll.sort(comparator));
  }

  where(fn) {
    return this.build(coll => coll.filter(fn));
  }

  compute() {
    console.log('start compute');
    if (this.memo) return;
    console.log('real compute');

    const reducer = (acc, func) => func(acc);
    this.collection = this.operations.reduce(reducer, this.collection);
    this.memo = true;
  }

  get length() {
    this.compute();
    return this.collection.length;
  }

  toArray() {
    this.compute();
    return this.collection;
  }
}





































class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
    this.memo = null;
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  select(fn) {
    return this.build(coll => coll.map(fn));
  }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);
      const compareResult = direction === 'asc' ? 1 : -1;
      if (a1 > b1) {
        return compareResult;
      } else if (a1 < b1) {
        return -compareResult;
      }

      return 0;
    };
    return this.build(coll => coll.sort(comparator));
  }

  where(fn) {
    return this.build(coll => coll.filter(fn));
  }

  compute() {
    console.log('start compute');
    if (this.memo) {
      return this.memo;
    };
    console.log('real compute');

    const reducer = (acc, func) => func(acc);
    this.memo = this.operations.reduce(reducer, this.collection);
    return this.memo;
  }

  get length() {
    const collection = this.compute();
    return collection.length;
  }

  toArray() {
    const collection = this.compute();
    return collection;
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

x = coll.where(car => car.brand === 'kia').orderBy(car => car.year);










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













































































function getAttributesAsLine() {
  return Object.keys(this.attributes).reduce((acc, key) =>
    `${acc} ${key}="${this.attributes[key]}"`, '');
}

export default function Node(name, attributes = {}) {
  this.name = name;
  this.attributes = attributes;

  this.getAttributesAsLine = getAttributesAsLine;
}




















Конструктор 'makeSegment', который принимает на вход две точки и возвращает сегмент. Первая точка это начало сегмента, вторая это конец.
Селекторы 'startSegment' и 'endSegment', которые извлекают из сегмента его начальную и конечную точку соответственно.
Вспомогательную функцию 'segmentToString', которая возвращает текстовое представление сегмента: [(1, 2), (-4, -2)].
Функцию 'midpointSegment', которая находит точку на середине отрезка по формулам: 
x = (x1 + x2) / 2 и y = (y1 + y2) / 2.


// eslint-disable-next-line
import { makePoint, getX, getY, toString as pointToString } from 'hexlet-points';
// eslint-disable-next-line
import { cons, car, cdr } from 'hexlet-pairs';

// BEGIN (write your solution here)
const makeSegment = (point1, point2) => cons(point1, point2);
const startSegment = segment => car(segment);
const endSegment = segment => cdr(segment);
const segmentToString = (segment) => {
  const point1 = startSegment(segment);
  const point2 = endSegment(segment);
  return `[${pointToString(point1)}, ${pointToString(point2)}]`;
};
const midpointSegment = (segment) => {
  const point1 = startSegment(segment);
  const point2 = endSegment(segment);
  const x = (getX(point1) + getX(point2)) / 2;
  const y = (getY(point1) + getY(point2)) / 2;
  return makePoint(x, y);
};

export { makeSegment, startSegment, endSegment, segmentToString, midpointSegment };
// END



















// Exceptions 2
tree = new Tree('/');
tree.addChild('var')
  .addChild('lib')
  .addChild('run');
tree.addChild('etc');
tree.addChild('home');

// example: getDeepChild
const subtree = tree.getDeepChild(['var', 'lib']);
subtree.getKey(); // lib

const parent = subtree.getParent();
parent.getKey(); // var

tree.removeChild('home'); // true
tree.removeChild('nonexistentNode'); // false







class Tree {
  constructor(key, meta, parent) {
    this.parent = parent;
    this.key = key;
    this.meta = meta;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getMeta() {
    return this.meta;
  }

  addChild(key, meta) {
    const child = new Tree(key, meta, this);
    this.children.set(key, child);

    return child;
  }

  getChild(key) {
    return this.children.get(key);
  }

  // BEGIN (write your solution here)
  hasChildren() {
    return this.children.size !== 0;
  }

  hasChild(key) {
    return this.children.has(key);
  }

  getParent() {
    return this.parent;
  }

  removeChild(key) {
    return this.children.delete(key);
  }

  getDeepChild(keys) {
    if (!keys.length) return undefined;

    return keys.reduce((currentNode, key) => {
      if (!currentNode) return undefined;

      const child = currentNode.getChild(key);
      if (child) {
        return child;
      }

      return undefined;
    }, this);
  }

  getChildren() {
    return Array.from(this.children.values());
  }

  // END
}



tree = new Tree('/');
tree.addChild('var')
  .addChild('lib')
  .addChild('run');
tree.addChild('etc');
tree.addChild('home');

// example: getDeepChild
const subtree = tree.getDeepChild(['var', 'lib']);
subtree.getKey(); // lib

const parent = subtree.getParent();
parent.getKey(); // var

tree.removeChild('home'); // true
tree.removeChild('nonexistentNode'); // false

































// Exceptions 3
README
Файловая система должна корректно обрабатывать пустые пути, делая внутри нормализацию. То есть, если ей передать путь ///etc/config//my///, то он транслируется в /etc/config/my.

HexletFs.js
Реализуйте следующие части интерфейса типа HexletFs.

isDirectory(path)

isFile(path)

mkdirSync(path)

touchSync(path) - создает пустой файл. На самом деле, в реальной файловой системе, команда touch меняет время последнего обращения к файлу, а побочным эффектом этой команды является создание файла в случае его отсутствия. По этой причине данной командой часто пользуются для создания файлов.

Пример:

files.isDirectory('/etc'); // false

files.mkdirSync('/etc');
files.isDirectory('/etc'); // true

files.mkdirSync('/etc/nginx');
files.isDirectory('/etc/nginx'); // true

files.isFile('/file.txt'); // false

files.touchSync('/file.txt');
files.isFile('/file.txt'); // true
Подсказки
Реализуйте функцию getPathParts, которая разбивает путь на массив имен. Без этой функции не будет работать метод findNode, осуществляющий глубокий поиск файла (каталога) внутри текущего каталога.
Для работы с путями используйте возможности встроенного в Node.js модуля Path.






import path from 'path';
import Tree from 'hexlet-trees'; // eslint-disable-line

// BEGIN (write your solution here)
const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }
  // BEGIN (write your solution here)
  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, { type: 'file' });
  }

  isFile(filepath) {
    // const parts = getPathParts(filepath);
    // const current = this.tree.getDeepChild(parts);
    const current = this.findNode(filepath);
    return current && current.getMeta().type === 'file';
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, { type: 'dir' });
  }

  isDirectory(filepath) {
    // const parts = getPathParts(filepath);
    // const current = this.tree.getDeepChild(parts);
    const current = this.findNode(filepath);
    return current && current.getMeta().type === 'dir';
  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }

  findPenultimateNode(filepath) {
    const parts = getPathParts(filepath);
    if (parts.length === 1) {
      return undefined;
    }

    return this.tree.getDeepChild(parts.slice(0, -1));
  }
}
























// Exceptions 4
Задача состоит в том, чтобы реализовать тип Stats и его формирование посредством динамической диспетчеризации благодаря подтипам Node.

Stats.js
Реализуйте тип Stats со следующим интерфейсом:
constructor
isFile()
isDirectory()

Node.js
Реализуйте надтип Node, интерфейсом которого являются функции:
getStats()
getName()

Dir.js, File.js
Реализуйте подтипы Dir и File (надтип Node). Варианты использования этих типов можно увидеть в файле HexletFs.js.


class Node {
  constructor(name, type) {
    this.name = name;
    this.stats = new Stats(type);
  }

  getStats() {
    return this.stats;
  }

  getName() {
    return this.name;
  }
}

class File extends Node {
  constructor(name) {
    super(name, 'file');
  }
}

class Dir extends Node {
  constructor(name) {
    super(name, 'dir');
  }
}

class Stats {
  constructor(type) {
    this.type = type;
  }

  isFile() {
    return this.type === 'file';
  }

  isDirectory() {
    return this.type === 'dir';
  }
}



















// Tech Solution
class Dir {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    return new Stats(this.isFile(), this.isDirectory());
  }

  getName() {
    return this.name;
  }

  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}


class File {
  constructor(name, body) {
    this.name = name;
    this.body = body;
  }

  getStats() {
    return new Stats(this.isFile(), this.isDirectory());
  }

  getName() {
    return this.name;
  }

  getBody() {
    return this.body;
  }

  isDirectory() {
    return false;
  }

  isFile() {
    return true;
  }
}

class Stats {
  constructor(file, directory) {
    this.file = file;
    this.directory = directory;
  }

  isFile() {
    return this.file;
  }

  isDirectory() {
    return this.directory;
  }
}































// Exceptions 4
HexletFs.js
Реализуйте следующие возможности файловой системы HexletFs:


mkdirpSync(path)
Создает директории рекурсивно (в отличие от mkdir).
Если в пути встречается файл, то возвращает false, т.к. нельзя создать директорию внутри файла.
Если все отработало корректно, то возвращается true


touchSync(path)
Эта функция обновляет (в метаданных) время доступа к файлу и, как побочный эффект, создает файл, в случае его отсутствия. По этой причине команду touch часто используют как способ создать файл. В данном упражнении она делает только это.
Если в пути встречается файл, то возвращает false, т.к. нельзя создать файл внутри файла
Если все отработало корректно, то возвращается true


readdirSync(path)
Возвращает список файлов (и папок) указанной директории.
Если директории не существует, то возвращает false
Если передан файл, то возвращает false


rmdirSync(path)
Удаляет директорию.

Если передан файл, то возвращает false и ничего не удаляет
Если директории не существует, то возвращает false
Если директория непустая, то возвращает false
Если все отработало корректно, то возвращается true





import path from 'path';
import Tree from 'hexlet-trees'; // eslint-disable-line
import { Dir, File } from 'hexlet-fs'; // eslint-disable-line


const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().getStats().isFile()) {
      return false;
    }
    return parent.addChild(base, new Dir(base));
  }

  // BEGIN (write your solution here)
  mkdirpSync(filepath) {
    return getPathParts(filepath).reduce((subtree, part) => {
      if (!subtree) {
        return false;
      }
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (current.getMeta().getStats().isFile()) {
        return false;
      }

      return current;
    }, this.tree);
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return false;
    }
    if (parent.getMeta().isFile()) {
      return false;
    }
    return parent.addChild(base, new File(base, ''));
  }

  readdirSync(filepath) {
    const current = this.findNode(filepath);
    if (!current || current.getMeta().getStats().isFile()) {
      return false;
    }
    return current.getChildren()
      .map(child => child.getMeta().getName());
  }

  rmdirSync(filepath) {
    const { base } = path.parse(filepath);
    const current = this.findNode(filepath);
    if (!current) {
      return false;
    }
    if (current.getMeta().getStats().isFile() || current.hasChildren()) {
      return false;
    }
    return current.getParent().removeChild(base);
  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}































































// Exceptions 5
import errors from 'errno';

errors.code.ENOTEMPTY;
// → {
//     "errno": 53,
//     "code": "ENOTEMPTY",
//     "description": "directory not empty"
//   }
HexletFs.js
Реализуйте следующие возможности файловой системы HexletFs:

unlinkSync(path)
Удаляет файл (в реальной фс все чуть сложнее, см. hard link).

Возможные ошибки:

ENOENT - файл не найден
EPERM - операция не разрешена. Такая ошибка возникает в случае, если path это директория
writeFileSync(path, content)
Записывает content в файл по пути path.

Возможные ошибки:

ENOENT - родительская директория, в которой нужно создать файл, не существует
EISDIR - path является директорией
readFileSync(path)
Читает содержимое файла по пути path.

ENOENT - файл не найден
EISDIR - path является директорией
Подсказки
Тип File содержит метод getBody, который возвращает содержимое файла.




















import path from 'path';
import errors from 'errno'; // eslint-disable-line
import Tree from 'hexlet-trees'; // eslint-disable-line
import { Dir, File } from 'hexlet-fs'; // eslint-disable-line

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    return [current.getMeta().getStats(), null];
  }

  // BEGIN (write your solution here)
  unlinkSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    } else if (current.getMeta().isDirectory()) {
      return [null, errors.code.EPERM];
    }
    return [current.getParent().removeChild(current.getKey()), null];
  }

  writeFileSync(filepath, body) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [parent.addChild(base, new File(base, body)), null];
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return [null, errors.code.ENOENT];
    }
    if (current.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [current.getMeta().getBody(), null];
  }
  // END

  mkdirpSync(filepath) {
    const iter = (parts, subtree) => {
      if (parts.length === 0) {
        return [subtree, null];
      }
      const [part, ...rest] = parts;
      const current = subtree.getChild(part);
      if (!current) {
        return iter(rest, subtree.addChild(part, new Dir(part)));
      }
      if (current.getMeta().isFile()) {
        return [null, errors.code.ENOTDIR];
      }

      return iter(rest, current);
    };
    const parts = getPathParts(filepath);
    return iter(parts, this.tree);
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [parent.addChild(base, new File(base, '')), null];
  }

  readdirSync(filepath) {
    const dir = this.findNode(filepath);
    if (!dir) {
      return [null, errors.code.ENOENT];
    } else if (dir.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [dir.getChildren().map(child => child.getKey()), null];
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }

}
































// Exceptions 6
HexletFs.js
Реализуйте функцию copySync(src, dest), которая копирует файл из src в dest.

Если dest это путь до папки, то имя файла берется из src
Если dest это путь до файла (существующего или нет), то его содержимое становится равным src
Возможные ошибки:

EISDIR - возникает в случае, если src это директория, а не файл
ENOENT - возникает в случае, если src не существует, а так же возникает в случае, если не существует директорий по пути dest (копирование не создает директорий)




import path from 'path';
import errors from 'errno'; // eslint-disable-line
import Tree from 'hexlet-trees'; // eslint-disable-line
import { Dir, File } from 'hexlet-fs'; // eslint-disable-line

import HexletFsError from './HexletFsError';

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    return current.getMeta().getStats();
  }

  // BEGIN (write your solution here)
  copySync(src, dest) {
    const data = this.readFileSync(src);
    const destNode = this.findNode(dest);
    if (destNode && destNode.getMeta().isDirectory()) {
      const { base } = path.parse(src);
      const fullDest = path.join(dest, base);
      return this.writeFileSync(fullDest, data);
    }
    return this.writeFileSync(dest, data);
  }
  // END

  writeFileSync(filepath, body) {
    const { dir, base } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    parent.addChild(base, new File(base, body));
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (parent.getMeta().isFile()) {
      throw new HexletFsError(errors.code.ENOTDIR, filepath);
    }
    return parent.addChild(base, new File(base, ''));
  }

  mkdirpSync(filepath) {
    getPathParts(filepath).reduce((subtree, part) => {
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (current.getMeta().isFile()) {
        throw new HexletFsError(errors.code.ENOTDIR, filepath);
      }

      return current;
    }, this.tree);
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    return current.getMeta().getBody();
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}













































































































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
