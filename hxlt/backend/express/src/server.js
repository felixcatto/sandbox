import Express from 'express';

const app = new Express();
app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
