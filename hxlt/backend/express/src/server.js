import Express from 'express';
import morgan from 'morgan';


const app = new Express();
const logger = morgan('combined');
app.use(logger);

app.get('/', (req, res) => {
  res.send('ggwp lanaya\n');
});


export default app;
