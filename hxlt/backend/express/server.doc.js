SomeThingsToDo  =>
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











import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';

import Post from './entities/Post';
import postsIndexHelpers from './views/posts/index';


const app = new Express();
app.use(morgan('dev'));

const viewsFolder = path.join(__dirname, 'views');
app.set('views', viewsFolder);
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(viewsFolder, 'layouts'),
  partialsDir: [
    path.join(viewsFolder, 'posts/partials'),
  ],
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: true }));


let posts = [
  new Post('hello', 'how are your?'),
  new Post('nodejs', 'story about nodejs'),
];


app.get('/', (req, res) => {
  res.send('<a href="posts">Go Post</a>');
});

app.get('/posts', (req, res) => {
  res.render('posts/index', {
    data: { posts },
    helpers: postsIndexHelpers,
  });
});

app.get('/posts/show/:id', (req, res) => {
  const post = posts[req.params.id];
  if (!post) res.send('This post don\'n exist');

  res.render('posts/show', {
    data: { post },
  });
});

app.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

app.post('/posts/new', (req, res) => {
  const { title, body } = req.body;
  const errors = {};
  if (!title) {
    errors.title = 'Title Can\'t be blank';
  }

  if (!body) {
    errors.body = 'Body Can\'t be blank';
  }

  if (Object.keys(errors).length === 0) {
    const post = new Post(title, body);
    posts.push(post);
    res.redirect(`/posts/show/${post.id}`);
    return;
  }

  res.status(422);
  res.render('posts/new', {
    data: {
      form: req.body, 
      errors,
    },
  });
});

export default app;































Express_3  =>
html формы обладают одним недостатком, который нам придется обойти. Все что мы можем указать в method (аттрибут определяющий тип запроса к серверу) это get или post, а нам нужны и patch и delete. Решается это эмуляцией. На сервер посылается post, а в action формы записывается ссылка с таким параметром ?_method=PATCH. Поддержкой со стороны сервера занимается библиотека methodOverride. Подключается она следующим образом:

app.use(methodOverride('_method'));
application.js
Реализуйте оставшиеся части круда для работы с постами.

GET /posts/:id/edit - редактирование поста
PATCH /posts/:id - обновление поста
DELETE /posts/:id - удаление поста

views/posts/index.pug
Реализуйте вывод постов в табличной форме. Для каждого поста нужно вывести ссылки для редактирования и удаления.

views/posts/edit.pug
Создайте форму для редактирования поста по образу и подобию формы создания поста new.pug.













































Express_4  =>
import uaParser from 'ua-parser-js';
Часто приложению нужно анализировать клиентов, которые приходят. Например, для пользователей ie6 часть функций может быть недоступна, поэтому желательно показывать предупреждение. Возможно сайт имеет оптимизированную версию для мобильных устройств и при определении оных, подставляет именно эту версию.

Для подобных задач, нужна возможность удобно оперировать свойствами user-agent. В каждом языке есть по несколько популярных решений. Все они сводятся к тому что им передается значение заголовка user-agent, а на выходе получается ассоциативный массив со всевозможными параметрами.

solution.js
Реализуйте и экспортируйте по умолчанию мидлвару, которая добавляет в request свойство useragent. Значением поля должен быть объект, полученный в результате парсинга заголовка User-Agent используя библиотеку ua-parser-js, которая уже импортирована.





















Express_6  =>
Работа с аутентификацией это хороший повод воспользоваться полиморфизмом включения. У нашего приложения два базовых состояния. Пользователь аутентифицирован, либо мы работаем с гостем. Во-первых после аутентификации необходимо создавать пользователя, которого обычно называют currentUser и с помощью мидлвары верхнего уровня прокидывают в res.locals, что дает нам возможность использовать его не только в обработчиках, но и в шаблонах. Таким образом мы локализуем общий код и строим абстракцию поверх реализации аутентификации. Теперь приложение не зависит от того как на самом деле все работает. Но этого недостаточно для того чтобы решение было "хорошим". Такой подход все равно будет заставлять нас делать проверки в стиле if (res.locals.currentUser && res.locals.currentUser.nickname) .... И в этот момент в голове должен сразу произойти щелчок, что мы условиями разруливаем типы, а значит никаким ооп не пахнет. Решение этой задачи очень простое, нам нужно создать тип Guest и всегда устанавливать currentUser. Тогда условие остается только в одном месте (в той мидлваре, которая устанавливает текущего пользователя), а весь остальной код работает так, как будто пользователь всегда есть, только в одном случае это аутентифицированный пользователь, в другом случае гость. Теперь можно расширять Guest и User так, чтобы их можно было прозрачно подменить. Как минимум понадобится метод isGuest, которым мы можем проверить с кем сейчас идет работа. Посмотрите как в таком случае будет выглядеть наш лейаут:
`
if currentUser.isGuest()
  ul.nav.navbar-nav.float-xs-right
    li.nav-item
      a.nav-link(href="/session/new") Sign in
    li.nav-item
      a.nav-link(href="/users/new") Sign up
else
  form.form-inline.float-xs-right(action='/session?_method=DELETE' method='post')
    button.btn.btn-link(type='submit') Sign out`
entities/User.js
Реализуйте сущность "Пользователь", которая будет использоваться в случае успешной аутентификации.

'views/session/new.pug'
Реализуйте форму для аутентификации

'solution.js'
Реализуйте регистрацию и аутентификацию пользователей на сайте:

'GET /users/new' - форма для создания нового пользователя
'POST /users' - создание нового пользователя. Должна производиться следующая валидация: пользователь и пароль не должны быть пустыми, никнейм должен быть уникальным. Если пользователь создан успешно то происходит перенаправление на главную страницу, иначе 422 и показ формы с подсветкой ошибок.
'GET /session/new' - страница с формой для аутентификации
'POST /session' - аутентификация. Если аутентификация не удалась, то выводим форму с сообщением Invalid nickname or password и статусом 422, иначе редирект на главную.
'DELETE /session' - удаление сессии. После закрытия сессии, должен произойти redirect на главную страницу.





