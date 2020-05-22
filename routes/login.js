const { Person, User } = require("../dataBase/models/schemas");
const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
var bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login: login });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = { name: user.login, role: user.role };
    let user = req.session.user;
    // res.cookie('status', 'true' )
    // res.cookie('name', user.login );
    res.redirect("/");
  } else {
    // res.cookie('status', 'false' )
    res.render("login", { message: "Неверно указан логин или пароль." });
  }
});

router.post("/register", async (req, res) => {
  const { login, password, email } = req.body;
  console.log(login, password, email);
  // console.log("login: " + login, "password: " + password);
  const findLogin = await User.findOne({ login: login });
  const findEmail = await User.findOne({ email: email });

  // console.log(findLogin)
  if (findLogin || findEmail) {
    let booleanLogin = findLogin.length > 0 ? true : false;
    let booleanEmail = findEmail.length > 0 ? true : false;
    if (booleanLogin && booleanEmail) {
      res.locals.loginError = { error: "Login  и Email уже существуют" };
    } else if (booleanLogin) {
      res.locals.loginError = { error: "Login уже существует" };
    } else {
      res.locals.loginError = { error: "Email уже существует" };
    }
    res.locals.loginError = true;
    // res.render("register");
  } else {
    const newUser = new User({
      login: login,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: "user",
      createdAt: Date.now(),
    });
    await newUser.save();
    res.locals.session = true;
    req.session.user = { name: newUser.login, role: newUser.role };
    res.redirect("/");
  }
  // res.render('./entries/register')
});

router.get("/logout", async (req, res) => {
  // res.clearCookie("status");
  // res.clearCookie("name");
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
