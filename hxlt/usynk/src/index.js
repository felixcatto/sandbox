import http from 'http';
import url from 'url';
import querystring from 'querystring';

// const x = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
// console.log(x);
// const uri = '/?q=%D1%8D%D1%80%D0%BB%D0%B0%D0%BD%D0%B3';
// const { query } = url.parse(uri);
// const { q } = querystring.parse(query);
// console.log(q); // эрланг


// const data = {
//   hostname: 'ru.hexlet.io',
//   pathname: '/my',
//   query: { page: 5 }
// };
// const y = url.format(data);
// console.log(y);





// Usync 1
// Реализуйте и экспортируйте по умолчанию функцию, которая обновляет query string в переданном адресе в соответствии с указанными значениями.

// Функция принимает на вход два параметра:

// адрес, который может содержать query string
// объект с параметрами, которые нужно проставить в query string
// import solution from './solution';
// const address = 'amazon.com/search?page=10&per=5';
// const actual = solution(address, { page: 100, per: 8, order: 'desc' });
// // amazon.com/search?page=100&per=8&order=desc
// Как видно параметры могут встречаться одновременно и в адресе, и в объекте.

// const address = 'amazon.com/search?page=10&per=5';
// const actual = solution(address, { order: 'desc', per: null });
// // amazon.com/search?page=10&order=desc
// Правила подстановки следующие:

// Если параметра не было, то он добавляется
// Если параметр уже был, то его значение заменяется тем, которое передано в объекте
// Если значение параметра null, то сам параметр должен отсутствовать в адресе, даже если он там был.

function replaceQueryString(href, newQueryObject) {
  const parsedUrl = url.parse(href, true);
  const oldQueryObj = parsedUrl.query;
  Object.keys(newQueryObject).forEach((key) => {
    const newValue = newQueryObject[key];
    if (newValue === null && key in oldQueryObj) {
      delete oldQueryObj[key];
    } else {
      oldQueryObj[key] = newValue;
    }
  });
  return url.format({
    hostname: parsedUrl.hostname,
    pathname: `${parsedUrl.pathname}`,
    query: parsedUrl.query,
  });
}

// const address = 'amazon.com/search?page=10&per=5';
// const actual = replaceQueryString(address, { page: 100, per: 8, order: 'desc' });
// console.log(actual);
// console.log('amazon.com/search?page=100&per=8&order=desc');





http.get('http://prodota.ru/', (res) => {
  console.log(res.statusCode);
  const body = [];
  res.on('data', (chunk) => {
    body.push(chunk.toString());
  }).on('end', () => {
    const data = body.join();
    console.log(data);
  });
});






















































// Usync 2
// В сети существует такая игра: вы получаете исходную ссылку на wiki страницу и необходимо за минимальное количество переходов дойти до статьи на заданную тему. Переходы осуществляются по любым ссылкам на странице, которые не выводят поиски за рамки википедии.

// solution.js
// Реализуйте и экспортируйте по умолчанию функцию для поиска статьи на заданную тему по алгоритму описанному выше, кроме требования "за минимальное количество переходов" и без необходимости отсекать внешние ссылки. Наша цель асинхронность, а не сложность алгоритма.

// Принимаемые параметры:

// title - название темы. Поиск должен происходить по точному соответствию.
// address - ссылка на страницу с которой будет производится поиск.
// callback - функция обратного вызова, в которую передается адрес найденной страницы либо ошибка. Ошибка возникает, например, в случае если были просмотрены все ссылки, а статья не найдена.
// Важно учитывать:

// В статьях могут быть взаимные ссылки, поэтому необходимо отслеживать то что уже было посещено, чтобы не возникало бесконечной рекурсии.
// В статьях возможны ссылки на внешние сайты, их нужно игнорировать, так как поиск ведется только внутри сайта.
// Пример:

// import solution from './solution';

// solution('операция', 'http://localhost:8080', (err, data) => {
//   console.log(data); // http://localhost:8080/operator
// });
// Все страницы имеют такую структуру:

// <html>
//   <head>
//     <title></title>
//   </head>
//   <body>
//     <h1>Википедия</h1>
//     <p>Как вы знаете, вики это большая база знаний обо всем на свете.
//       Наш сайт это не настоящая <a href="https://www.wikipedia.org/">википедия</a>,
//       но кое что мы сюда добавили).</p>
//     <p>Например статью про <a href="/operators">операции</a>, а так же статьи про
//       <a href="/expressions">выражения</a> и <a href="/statements">инструкции</a></p>
//   </body>
// </html>
// Заголовок h1 содержит точное название темы
// Под заголовком абзац(ы) с произвольным текстом внутри которого встречаются ссылки по которым и нужно ходить
// Подсказки
// Для извлечения данных из текста воспользуйтесь функциями getTitle и getLinks


const getify = (expectedTitle, link, callback) => {
  const { protocol, hostname, pathname, port } = url.parse(link);
  const search = (waited, visited) => {
    if (waited.length === 0) {
      callback(new Error('link was not found'));
      return;
    }
    const [current, ...rest] = waited;
    const body = [];

    const address = url.format(
      { protocol, hostname, port, pathname: current });

    if (visited.has(current)) {
      search(rest, visited);
      return;
    }

    http.get(address, (res) => {
      res.on('data', (chunk) => {
        body.push(chunk.toString());
      }).on('end', () => {
        const data = body.join();
        const actualTitle = getTitle(data);
        if (expectedTitle === actualTitle) {
          callback(null, address);
          return;
        }
        const newLinks = getLinks(data);
        visited.add(current);
        search([...newLinks, ...rest], visited);
      });
    });
  };

  search([pathname], new Set());
};


























// Usync 3
// Реализуйте и экспортируйте по умолчанию функцию, которая с помощью http запросов, эмулируя поведение пользователя, выполняет регистрацию на сайте.

// Функция принимает на вход четыре параметра:

// Адрес формы регистрации (get запрос)
// Адрес по которому необходимо отправить данные формы (post запрос)
// nickname - значение поля nickname из формы регистрации
// Коллбек, который будет вызван после окончания операции. Коллбек принимает на вход единственный параметр - err в случае если произошла ошибка.
// На сайте реализована защита от csrf, поэтому перед непосредственной отправкой данных формы на соответствующий адрес, необходимо сделать запрос на форму регистрации, извлечь из нее токен и отправить его вместе с данными формы по нужному адресу.

// В упражнении доступен веб-доступ, по которому открывается этот сайт. Попробуйте посмотреть исходный код страницы, найти там этот токен, а так же выполните регистрацию.

// Обработка ошибок
// В случае если первый запрос вернет статус не 200, то вызываем коллбек и передаем туда ошибку. В случае если второй запрос вернет статус не 302, то так же вызываем коллбек и передаем ошибку.

// Подсказки
// Для извлечения токена из тела запроса, воспользуйтесь функцией getToken



const getToken = body => body.match(/value="(\w+)"/)[1];

export default (registrationFormUrl, submitFormUrl, nickname, callback) => {
  // BEGIN (write your solution here)
  http.get(registrationFormUrl, (gres) => {
    if (gres.statusCode !== 200) {
      callback(new Error(`Expected 200, but was ${gres.statusCode} for '${registrationFormUrl}'`));
    } else {
      const body = [];
      gres.on('data', (chunk) => {
        body.push(chunk.toString());
      }).on('end', () => {
        const html = body.join();
        const data = querystring.stringify({ nickname, token: getToken(html) });
        const urlObject = url.parse(submitFormUrl);
        const options = {
          host: urlObject.hostname,
          port: urlObject.port,
          path: urlObject.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
          },
        };
        const req = http.request(options, (res) => {
          if (res.statusCode === 302) {
            callback();
          } else {
            callback(new Error(`Expected 302, but was ${res.statusCode} for '${submitFormUrl}'`));
          }
        });
        req.end(data);
      });
    }
  });
  // END
};


































































// Usync 4
В этом упражнении необходимо создать библиотеку для работы с http, которая оборачивает встроенный в node.js модуль http в промисы. Интерфейсом библиотеки являются две функции: get и post.

Определение функции get:

export const get = (url, config = {}) =>
  dispatch({ ...config, url, method: 'GET' });
Использование:

const host = 'http://ru.hexlet.io';

get('http://ru.hexlet.io').then(response => {
  console.log(response.status); // 301
});
Определение функции post:

export const post = (url, data, config = {}) =>
  dispatch({ ...config, url, data, method: 'POST' });
const data = { nickname: 'scooter' };
post('https://ru.hexlet.io/users', data).then(response => {
  console.log(response.status); // 201
});
config – это объект со следующей структурой:

method - глагол http
data - объект содержащий данные, которые будут отправлены в теле запроса
url - адрес назначения
params - параметры, которые будут подставлены в адрес как query params
headers - заголовки
response – это тоже объект, состоящий из:

status - код ответа
statusText - текст ответа соответствующий коду
headers - заголовки
data - тело ответа
Дополнительной фишкой библиотеки является автоматическое кодирование данных при выполнении post запроса и установка следующих заголовков:

'Content-Type': 'application/x-www-form-urlencoded'
'Content-Length': ...
dispatcher.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход конфигурацию запроса (примеры в solution.js) и возвращает промис. В промисе должен выполняться запрос, соответствующий параметрам из входной конфигурации.




const getSearch = (queryParams, params) => {
  const mergedQuery = { ...queryParams, ...params };
  const keys = Object.keys(mergedQuery)
  const newQueryParams = keys
    .filter(key => mergedQuery[key] !== null && mergedQuery[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: mergedQuery[key] }), {});

  return keys.length > 0 ? `?${querystring.stringify(newQueryParams)}` : '';
}

// BEGIN (write your solution here)
const prepareData = (data, headers) => {
  if (data === undefined) {
    return [data, headers];
  }
  const preparedData = querystring.stringify(data);
  const bufferData = Buffer.from(preparedData, 'utf-8');
  return [bufferData, {
    ...headers,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(bufferData),
  }];
};

export default (config) => {
  const [data, headers] = prepareData(config.data, config.headers || {});

  const urlObject = url.parse(config.url, true);
  const search = getSearch(urlObject.query, config.params);

  const options = {
    hostname: urlObject.hostname,
    port: urlObject.port,
    method: config.method,
    path: `${urlObject.pathname}${search}`,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
      };

      const responseData = [];
      res.on('data', (chunk) => {
        responseData.push(chunk.toString());
      });

      res.on('end', () => {
        response.data = responseData.join('');
        resolve(response);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end(data);
  });
};
// END
























































// Usync 5
solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая обновляет значение по ключу backends/current в consul. Функция принимает на вход два адреса: 1) адрес по которому можно получить список серверов 2) адрес для обновления значения текущего незагруженного поддомена (post запросом).

Функция должна вернуть promise, выполняющий обновление значения по ключу backends/current.

Подсказки
Функции get и post возвращают promise.

export default (backendsListUrl, setCurrentBackendUrl) => get(backendsListUrl)
  .then((result) => {
    const data = JSON.parse(result.data);
    const promises = data.map(({ url }) => get(`${url}/status`));

    return Promise.all(promises);
  })
  .then((responses) => {
    const values = responses.map(v => JSON.parse(v.data))
      .sort((v1, v2) => v1.workload - v2.workload);
    const best = values[0];
    return post(setCurrentBackendUrl, { value: best.url });
  });






























// Usync 6
// x = { 
//   a: 'vasa eto boroda',
//   b: 'ggwp lanaya',
//   c: 'privet medved',
//   [Symbol.iterator]: function() {
//     let nextIndex = 0;

//     const next = () => {
//       if (nextIndex < this.collection.length) {
//         const value = this.collection[nextIndex++];
//         return { value, done: false };
//       }
//       return { done: true };
//     };
//     return { next };
//   },
// };

// for (let v of x) console.log(v);






// const makeIterator = function* (coll) {
//   for (const value of coll) {
//     yield value;
//   }
// };






// const obj = {
//   collection: ['yo', 'ya'],
//   [Symbol.iterator]: function* () {
//     yield* this.collection;
//   },
// };

// for (const v of obj) {
//   console.log(v);
// }

// function* gen(list, getNext) {
//   let currentEl = list[0];
//   for (let i = 0; i < list.length; i += 1) {
//     yield currentEl;
//     currentEl = getNext(currentEl);
//   }
// }








// Реализуйте и экспортируйте по умолчанию класс, который представляет собой бесконечную последовательность. Объекты этого класса должны быть итерируемыми.

// import Seq from './seq';

// const seq = new Seq(1, x => x + 1);
// // или так: const result = seq.skip(50).skip(150).take(3);
// const result = seq.skip(200).take(3);
// for (const value of result) {
//   actual.push(value);
//   console.log(value);
// }
// // 201
// // 202
// // 203

// for (const value of seq.skip(10).take(1)) {
//   console.log(value);
// }
// // 11
// Как видно из примера выше, методы класса построены с применением fluent interface.

// Конструктор класса принимает на вход три параметра:

// Стартовое значение последовательности
// Функцию, которая генерирует новое значение последовательности на основе предыдущего
// Количество элементов последовательности, по умолчанию последовательность бесконечна (Infinity)
// Также на классе определено две функции: skip(n) и take(m). Первая пропускает первые n элементов, вторая ограничивает коллекцию m элементами.


class Seq {
  constructor(start, next, count = Infinity) {
    this.start = start;
    this.next = next;
    this.count = count;
    this.current = start;

    this[Symbol.iterator] = function* gen() {
      for (let i = 0; i < count; i += 1) {
        yield this.current;
        this.current = next(this.current);
      }
    };
  }

  take(count) {
    return new Seq(this.start, this.next, count);
  }

  skip(count) {
    let newStart = this.current;
    for (let i = 0; i < count; i += 1) {
      newStart = this.next(newStart);
    }
    return new Seq(newStart, this.next, this.count);
  }
}


























































































// Usync 6
Реализуйте и экспортируйте по умолчанию функцию co. Она должна принимать на вход генератор и возвращать promise. Функция co опирается на то, что внутри генератора yield используется только для promise.

co(function* () {
  const a = yield Promise.resolve(1);
  const b = yield Promise.resolve(2);
  const c = yield Promise.resolve(3);

  return [a, b, c]; // [1, 2, 3]
}).then(data => console.log(data));
// [1, 2, 3]
В случае, если promise внутри генератора переходит в состояние rejected, то co трансформирует возникшую ошибку в исключение.

co(function* () {
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.log(err.message);
  }
});













var getPromise = (val, err) =>
  new Promise((resolve, reject) => {
    if (err) {
      reject(err);
      return;
    }
    setTimeout(() => resolve(val), val);
  });

function* gen() {
  const x = yield getPromise(1000);
  console.log(x);
  const y = yield getPromise(500);
  console.log(y);
  return x + y;
}


const co = (generator) => {
  const iterator = generator();

  const next = (result) => {
    const value = result.value;
    if (result.done) {
      return value;
    }

    return value.then(res => next(iterator.next(res)));
  };

  return next(iterator.next());
};


x = co(gen);
x.then(result => console.log(result));





















































// Usync 7
var getPromise = (val, err) =>
  new Promise((resolve, reject) => {
    if (err) {
      reject(err);
      return;
    }
    setTimeout(() => resolve(val), val);
  });

// var wow = async () => {
//   return getPromise(2000);
// }

var wow = async () => {
  const value1 = await getPromise(500);
  const value2 = await getPromise(1000);
  return value1 + value2;
}

wow().then(res => console.log(res));








Эта задача полностью повторяет задачу про CSRF. Цель – увидеть катастрофическую разницу между использованием коллбеков и async/await.

Для выполнения http запросов воспользуйтесь импортированными функциями из библиотеки hexlet-http-request, которую мы реализовывали в одном из уроков.

solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая с помощью http запросов, эмулируя поведение пользователя, выполняет регистрацию на сайте.

Функция принимает на вход следующие параметры:

Адрес формы регистрации (get запрос)
Адрес, по которому необходимо отправить данные формы (post запрос)
nickname - значение поля nickname из формы регистрации
На сайте реализована защита от csrf, поэтому перед непосредственной отправкой данных формы на соответствующий адрес необходимо сделать запрос на форму регистрации, извлечь из нее токен и отправить его вместе с данными формы по нужному адресу.

В упражнении доступен веб-доступ, по которому открывается этот сайт. Попробуйте посмотреть исходный код страницы, найти там этот токен, а так же выполните регистрацию.

Обработка ошибок
В случае, если первый запрос вернет статус не 200, то возвращаем resolved промиз, но передаем туда ошибку.
В случае, если второй запрос вернет статус не 302, то так же возвращаем resolved промиз с передачей внутрь ошибки.
Подсказки
Для извлечения токена из тела запроса воспользуйтесь функцией getToken




export default async (registrationFormUrl, submitFormUrl, nickname) => {
  const response = await get(registrationFormUrl);
  if (response.status !== 200) {
    return new Error(`Expected 200, but was ${response.status} for '${registrationFormUrl}'`);
  }
  const data = { nickname, token: getToken(response.data) };
  const response2 = await post(submitFormUrl, data);
  if (response2.status !== 302) {
    return new Error(`Expected 302, but was ${response2.status} for '${submitFormUrl}'`);
  }

  return null;
};