import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';


const app = new Express();
const log = debug('app');
app.use(morgan('combined'));
log('initialize');

app.get('/', (req, res) => {
  res.send('ggwp lanaya\n');
  log(`get ${req.path}`);
});


export default app;
