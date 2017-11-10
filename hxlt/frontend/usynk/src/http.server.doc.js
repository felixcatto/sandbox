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







// import http from 'http';

// const server = http.createServer((request, response) => {
//   // content-length
//   response.write('hello, world!');
//   response.end();
// })

// const port = 4000;
// server.listen(port, () => {
//   console.log('Server has been started');
// });






























































// HTTP 1
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



// import path from 'path';
// import http from 'http';
// import { readFileSynk } from './lib/utils';


// const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
// // readFileSynk(phonebookFilePath)
// //   .then((data) => {
// //     console.log(data.split('\n').length);
// //   });

// const server = http.createServer(async (request, response) => {
//   const phones = await readFileSynk(phonebookFilePath);
//   const count = phones.trim().split('\n').length;
//   const data = `Welcome to The Phonebook\nRecords count: ${count}\n`;
//   response.setHeader('Content-Type', 'text/plain; charset=utf-8');
//   response.setHeader('Content-Length', Buffer.byteLength(data));
//   response.setHeader('Transfer-Encoding', 'identity');
//   response.write(data);
//   response.end();
// });


// server.listen(4000, () => {
//   console.log('Server has been started');
// });
