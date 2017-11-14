import url from 'url';
import path from 'path';
import http from 'http';
import { readFileSynk } from './lib/utils';


// const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
// // readFileSynk(phonebookFilePath)
// //   .then((data) => {
// //     console.log(data.split('\n').length);
// //   });

// const server = http.createServer(async (request, response) => {
//   // console.log('Incoming Request...\n');
//   console.log(`request.url: ${request.url}`);
//   console.log(`request.method: ${request.method}`);
//   console.log(`request.headers.host: ${request.headers.host}`);
//   console.log('\n');

//   const phones = await readFileSynk(phonebookFilePath);
//   const count = phones.trim().split('\n').length;
//   const data = `Welcome to The Phonebook\nRecords count: ${count}\nFinally auto restart works!\n`;
//   response.end(data);
// });


// server.listen(4000, () => {
//   console.log('Server has been started');
// });















// http.createServer((request, response) => {
//   request
//     .on('error', err => {
//       console.error(err);
//     })
//     .on('end', () => {
//       response.on('error', err => {
//         console.error(err);
//       });
//       response.statusCode = 200;
//       response.setHeader('Content-Type', 'application/json');
//       const message = 'Welcome to The Phonebook';
//       response.end(message);
//     });
//   request.resume(); // !!!
// }).listen(4000);





































const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
const server = http.createServer(async (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  if (!parsedUrl.pathname.startsWith('/users.json')) {
    response.end('');
  }

  const phones = await readFileSynk(phonebookFilePath);
  const phoneStrings = phones.trim().split('\n');
  const phoneJson = phoneStrings.map((str) => {
    const [id, name, phone] = str.split('|').map(el => el.trim());
    return { id, name, phone };
  });

  const page = +parsedUrl.query.page || 0;
  const perPage = +parsedUrl.query.perPage || 10;
  const paginatedData = phoneJson.filter((el, i) => i >= page * perPage && i <= page * perPage + perPage - 1);
  const result = {
    meta: {
      perPage,
      page,
      totalPages: Math.ceil(phoneJson.length / perPage),
    },
    data: paginatedData,
  };

  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(result));
});


server.listen(4000, () => console.log('Server has been started'));
