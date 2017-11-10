import path from 'path';
import http from 'http';
import { readFileSynk } from './lib/utils';


const phonebookFilePath = path.join(__dirname, 'lib/phonebook.txt');
// readFileSynk(phonebookFilePath)
//   .then((data) => {
//     console.log(data.split('\n').length);
//   });

const server = http.createServer(async (request, response) => {
  console.log('Incoming Request...\n');
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
