SimpleHTTP  =>
ps xf // good version of ps
  // x   - показать все процессы
  // f   - показать в виде графа
  // a/u - доп инфа
lsof -i :4000 // know who use port 4000

// telnet
telnet localhost 4000

GET / HTTP/1.1
host: hexlet.io
connection: close






import http from 'http';

const server = http.createServer((request, response) => {
  // content-length
  response.write('hello, world!');
  response.end();
})

const port = 4000;
server.listen(port, () => {
  console.log('Server has been started');
});






























































HTTP_1  =>
solution.js
Реализуйте http-сервер, который является интерфейсом доступа к телефонному справочнику.

Справочник представлен текстовым файлом phonebook.txt. Его формат:

1 | Carleton Sporer | 197.328.3450
2 | Ashton Bogisich | 244.742.7016
3 | Valentin Auer | 964.685.7490
4 | Buddy Kuvalis | 356.157.9872
Каждая строчка представляет собой отдельную запись о человеке. Она содержит три значения, разделенных символом |. 1 - это id, 2 - имя, 3 - телефон.

При запросе на / сервер должен отдавать следующее тело:

Welcome to The Phonebook
Records count: 1000
Количество записей в phonebook.txt вычисляется в момент чтения файла и используется в выводе Records count: <тут>.

Flow
Кроме запуска тестов, обязательно попробуйте "поиграть" с написанным сервером. Для этого воспользуйтесь командой make start, которая запускает ваш сервер. После этого вы можете делать к нему запросы, используя, например, telnet. Не забывайте перезапускать сервер при изменении исходного кода. Для остановки сервера воспользуйтесь комбинацией ctrl+c.


// Solution
import path from 'path';
import http from 'http';
import { readFileSynk } from './lib/utils';


const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
// readFileSynk(phonebookFilePath)
//   .then((data) => {
//     console.log(data.split('\n').length);
//   });

const server = http.createServer(async (request, response) => {
  const phones = await readFileSynk(phonebookFilePath);
  const count = phones.trim().split('\n').length;
  const data = `Welcome to The Phonebook\nRecords count: ${count}\n`;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.setHeader('Content-Length', Buffer.byteLength(data));
  response.setHeader('Transfer-Encoding', 'identity');
  response.write(data);
  response.end();
});


server.listen(4000, () => {
  console.log('Server has been started');
});
























Restart  =>
По умолчанию nodemon смотрит файлы в текущей рабочей директории. Это поведение можно поменять так: nodemon --watch app --watch libs app/server.js

























































HTTP_2  =>
index.js
Реализуйте логику парсинга файла phonebook.txt в следующий формат:

{
  <id>: {
    name: <name>,
    phone: <phone>,
  },
  <id>: {
    name: <name>,
    phone: <phone>,
  },
}
Где <id> - это идентификатор конкретной записи, а <name> и <phone> – это имя и телефон соответствующей записи.

server.js
Сервер позволяет выполнять запросы на поиск всех записей, соответствующих критерию поиска. Критерием является часть имени/фамилии, по которой производится сопоставление.

В запросе к серверу по ссылке /search необходимо передать один параметр: q, значением которого, будет подстрока. В случае, если найдены сопоставления, то сервер возвращает данные в следующем формате (для подстроки miss):

Miss Arlo Barrows, 328-949-3924
Miss Bernadette Conn, 249.059.5515
Miss Savannah Dicki, 157.463.3368
Miss Rudy Brown, 779-703-0150

Обратите внимание, что регистр при сопоставлении не учитывается.

В случае если запрос к серверу выполняется без параметров или соответствий не найдено, он должен вернуть пустую строку.

$ curl localhost:8080/search

$ curl localhost:8080/search?q=mrs
Mrs. Rosalia Wisoky, (865) 611-8960
Mrs. Earl Gaylord, 944-345-3158
Mrs. Roslyn Moen, 526.643.3627
Mrs. Giovani Rempel, 842-246-9417







// Solution
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
const server = http.createServer(async (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  if (!parsedUrl.pathname.startsWith('/search') || parsedUrl.query.q === undefined) {
    response.end('');
  }

  const phones = await readFileSynk(phonebookFilePath);
  const phoneStrings = phones.trim().split('\n');
  const phonesObj = {};
  phoneStrings.forEach((str) => {
    const [id, name, phone] = str.split('|').map(el => el.trim());
    phonesObj[id] = { name, phone };
  });

  const query = parsedUrl.query.q;
  const regexp = new RegExp(`.*${escapeRegExp(query)}.*`, 'i');
  const data = Object.keys(phonesObj)
    .filter(key => regexp.test(phonesObj[key].name))
    .map(key => `${phonesObj[key].name}, ${phonesObj[key].phone}`)
    .join('\n');
  response.end(data);
});


server.listen(4000, () => console.log('Server has been started'));








































































HTTP_3  =>
Реализуйте обработчик адреса /users.json. Он должен отдавать данные в следующем формате:

{
  "meta": { "page": 5, "perPage": 2, "totalPages": 500  },
  "data": [
    { "name": "Mrs. Marlee Lesch", "phone": "(412) 979-7311" },
    { "name": "Mrs. Mabelle Cormier", "phone": "307.095.4754" }
  ]
}
Этот вызов должен поддерживать пагинацию (pagination, постраничный вывод) результата. За это отвечают два параметра запроса:

page - текущая запрошенная страница. По умолчанию 1.
perPage - количество возвращенных данных на страницу. По умолчанию 10.
Пример:

$ curl localhost:8080/users.json?page=2&perPage=3
{
  meta: { page: 2, perPage: 3, totalPages: 334 },
  data: [
    { name: "Liam Wiegand", phone: "1-327-988-3382" },
    { name: "Lonny McGlynn", phone: "(935) 384-0149" },
    { name: "Dr. Faustino Bailey", phone: "746-901-8330" }
  ]
};