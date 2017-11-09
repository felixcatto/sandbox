// server.js
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