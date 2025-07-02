const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveredirectUrl } = require('../middleware.js');

const userController =require('../controller/user.js');



router.get("/signup",userController.renderSignup)

router.post("/signup", wrapAsync(userController.signupUser));

router.get("/login", userController.renderLogin)

router.post("/login", saveredirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.loginUser)

router.get("/logout", userController.logoutUser)

module.exports = router;
