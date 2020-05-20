const router = require('express').Router();

//если залогинен то рендерить indeх (список отделов и форма загрузки файла)
//если не залогинен - рендерить форму авторизации

router.get('/', (req, res) => {
  if (!req.session.user) 
  { res.render('login') }
   else 
  { 

    res.render('index', { dept }) }
});

//сраниваем введенное в форму с базой, если ок - рендерим индекс, если нет - выводим ошибку
router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = User.findOne({nick: req.body.login}) 
try {
	if (user && (await bcrypt.compare(password, user.password)))
  { res.render('index') } 
  else 
  {
    throw error
  }} catch(e) {
    res.render("login", { error, message: "Неверно указан логин или пароль." });
  }
});

module.exports = router;
