import Express from 'express';

const app = new Express();
let counter = { value: 0 };

app.get('/', (req, res) => {
  res.json(counter);
});
app.post('/increment', (req, res) => {
  counter.value += 1;
  res.status(204).send();
});
app.post('/decrement', (req, res) => {
  counter.value -= 1;
  res.status(204).send();
});
app.put('/reset', (req, res) => {
  counter.value = 0;
  res.status(204).send();
});
app.put('/set', (req, res) => {
  counter.value = +req.query.value;
  res.status(204).send();
});
app.get('*', (req, res) => {
  res.status(404);
  res.send();
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
