const { overdone, undone, overfiveteen } = require('../drivers');
const router = require('express').Router();
const { Person } = require('../dataBase/models/schemas');
const fileUpload = require('express-fileupload');

//если залогинен то рендерить indeх (список отделов и форма загрузки файла)
//если не залогинен - рендерить форму авторизации

//Главное меню (загрузка файлов + список юнитов)
router.get('/', async (req, res) => {
  const depts = await Person.find();
  depts.filter(function (item, pos) {
    return depts.indexOf(item) == pos;
  });
  res.render('index', depts);
});

//POST загрузка файлов в парсинг
router.post('/upload', async (req, res) => {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('Файл не был загружен');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line
  sampleFile = req.files.sampleFile;
  uploadPath =
    __dirname.replace('routes', '') + 'dataBase/csv/' + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/');
  });
});

//Страница с отчётом
router.get('/:id', async (req, res) => {
  //поиск топ 5
  //топ 5 перевыполненных
  let overDone = await overdone(req.params.id);
  console.log('BD: Топ 5 перевыполненных: ', overDone);
  //топ 5 невыполненных
  let unDone = await undone(req.params.id);
  console.log('BD: Топ 5 невыполненных: ', unDone);
  //сколько ежедненвых задач (>4 в неделю) выполнено, сколько дб выполнено
  //let dailyDoneTasks = dailydonetasks(req.params.id);
  //вывести людей которые работали больше 15 часов, или вывести, что таких нет
  let overFiveteen = await overfiveteen(req.params.id);
  console.log(overFiveteen);
  //для каждого человека вывести сколько часов он работал и сколько задач выполнил
  //вывести сколько людей работало меньше 7 часов
  //для каждого человека вывести сколько часов работал и сколько задач выполнил
  //если задача имеет should be received - в колонке number of times нужно вывести эту задачу

  res.render('index' /* рендер в таблицу */);
});

//сраниваем введенное в форму с базой, если ок - рендерим индекс, если нет - выводим ошибку
router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = User.findOne({ nick: req.body.login });
  try {
    if (user) {
      // && (await bcrypt.compare(password, user.password)))
      res.render('index');
    } else {
      throw error;
    }
  } catch (e) {
    res.render('login', { error, message: 'Неверно указан логин или пароль.' });
  }
});

module.exports = router;
