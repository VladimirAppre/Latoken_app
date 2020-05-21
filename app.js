require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const mongooose = require('mongoose');


mongooose.connect(
  'mongodb+srv://mikhail:elbrus@cluster0-hjq5d.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


const indexRouter = require('./routes/index');

const store = new MongoStore({
  collection: 'sessions',
  uri:
    'mongodb+srv://mikhail:elbrus@cluster0-hjq5d.mongodb.net/test?retryWrites=true&w=majority',
});

// Подключаем handlebars и указываем путь до папки views
app.set('views', path.join(__dirname, 'templates/views'));
app.set('view engine', 'hbs');

// Подключаем возможность читать формат json на сервере
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Подключаем статичные маршруты
app.use(express.static(path.join(__dirname, 'public')));

// Настраиваем объект сессии
app.use(
  session({
    secret: 'someSecretWord',
    resave: false,
    saveUninitialized: false,
    store, // указываем хранить сессии в MongoStore
  })
);

// Подключаем middleware для проверки сессии пользователя
app.use((req, res, next) => {
  res.locals.isAuth = req.session.auth;
  res.locals.username = req.session.username;
  next();
});

// Указываем ссылки на роутеры
app.use('/', indexRouter);

app.listen(3000);
