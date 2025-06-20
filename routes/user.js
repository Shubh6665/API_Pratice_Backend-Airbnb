const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveredirectUrl } = require('../middleware.js');

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email,
            username
        })
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {    //signup krte hii loggedIn
            if (err) {
                return next(err);
            } else {
                req.flash("success", "User Registered Successfully");
                res.redirect("/listings");
            }
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login", saveredirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    req.flash("success", "Login Successful!");
    let redirectUrl=req.session.redirectUrl || '/listings';
    res.redirect(redirectUrl);
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            req.flash("success", "Logged Out Successfully!");
            res.redirect("/listings");
        }
    })
})

module.exports = router;
