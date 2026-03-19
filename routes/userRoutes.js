const express=require('express');
const routers=express.Router({mergeParams:true});
// const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const userController=require("../controllers/userController");


routers
.route("/signup")
.get(userController.renderSignupForm)
.post(saveRedirectUrl,wrapAsync(userController.signUp));

routers
.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),
    userController.login
);

routers.get("/logout",userController.Logout);

module.exports=routers;