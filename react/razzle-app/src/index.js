import http from 'http';

let app = require('./main/server').default;

const server = http.createServer(app);

let currentApp = app;

server
  .listen(process.env.PORT || 3000, () => {
    console.log('🚀 started');
  })
  .on('error', error => {
    console.log(error);
  });

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./main/server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./main/server').default; // eslint-disable-line
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
