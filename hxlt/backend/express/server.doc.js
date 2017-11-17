SomeThingsToDo  =>
* res.locals в шаблонах
* named routes
* https://github.com/ericf/express-handlebars
* https://github.com/expressjs/express/wiki#template-engines





















































Express_0  =>
import Express from 'express';
import Router from 'named-routes';

const app = new Express();
const router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});
app.get('/users/:userId/books/:id', (req, res) => {
  const { userId, id } = req.params;
  res.send(`${JSON.stringify(req.params)}`);
});
app.get('/admin/users/:id', 'admin.user', (req, res, next) => {
  //... implementation
  // the names can also be accessed here:
  var url = app.namedRoutes.build('admin.user', { id: 2 }); // /admin/user/2
  res.send(`<a href="${url}">Admin Link</a>`);
  // the name of the current route can be found at req.route.name
});
app.get('/ggwp', 'admin.user', (req, res, next) => {
  // req.query
  res.status(301);
  res.json({ ggwp: 'lanaya'});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});










































Express_1  =>
Ваше первое express приложение, будет представлять из себя простой счетчик, с доступом через http интерфейс. Над счетчиком можно выполнять следующие операции:

/ - получить текущее значение счетчика в виде json: { "value": 0 }
<METHOD> /increment - увеличение на единицу
<METHOD> /decrement - уменьшение на единицу
<METHOD> /reset - сброс значения счетчика на значение по умолчанию.
<METHOD> /set?value=5 - установка счетчика в конкретное значение, которое передается как query параметр с именем value.
Значение по умолчанию равно нулю. Все точки входа, кроме /, должны возвращать 204 no content.

Имена методов не указаны специально. Необходимо их выбрать правильно с учетом требований http к семантике глаголов. Важно анализировать идемпотентность операции и требований по обеспечению идемпотентности глаголами http.

solution.js
Реализуйте функцию, которая возвращает сконфигурированное express приложение по приведенному выше сценарию.





// Solution
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



















































Express_2  =>
Реализуйте приложение, которое представляет из себя блог. Сайт должен позволят просматривать список постов и давать возможность добавлять новые посты.

'GET /posts' - список постов
'GET /posts/:id' - страница поста
'GET /posts/new' - форма для создания нового поста
'POST /posts' - создание нового поста. В случае успеха ожидается редирект на страницу поста, в противном случае должен быть возвращен код 422 и отрисована форма с указанием ошибок.
Приложение содержит одну сущность - 'Post', которая содержит три обязательных поля:

'title' и 'body' - задаются через форму.
'id' - проставляется автоматически, для каждого нового поста должен увеличиваться на единицу

'entities/Post'
Реализуйте сущность Post

'solution.js'
Реализуйте недостающие обработчики express

'views/posts/index.pug'
Реализуйте вывод постов в табличной форме. Так же на страницы должны быть ссылки на просмотр постов и ссылка на создание нового.

'views/posts/new.pug'
Реализуйте форму создания нового поста

'views/posts/show.pug'
Реализуйте просмотр конкретного поста














// <h2>{{title}}</h2>
// <p>{{author.id}}: {{author.name}}</p>
// <p>{{notice}}</p>
// <ul>
//   {{#each people}}
//     <li>{{this.firstName}} {{this.lastName}}</li>
//   {{/each}}
// </ul>
// {{> message ggwp=322}}
// {{> message ggwp='solo'}}

// export default {
//   title: "My First Blog Post!",
//   author: {
//     id: 47,
//     name: "Yehuda Katz"
//   },
//   body: "My first post. Wheeeee!",
//   people: [
//     { firstName: "Yehuda", lastName: "Katz" },
//     { firstName: "Carl", lastName: "Lerche" },
//     { firstName: "Alan", lastName: "Johnson" },
//   ],
//   helpers: {
//     notice() {
//       return `${this.title} - most weird phrase`;
//     },
//   },
// };