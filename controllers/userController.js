const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("./user/signup.ejs")
};

module.exports.signUp=async (req,res,next)=>{
    try{
    let {username,email,password}=req.body;
    let user1=new User({email,username})
    const registerUser=await User.register(user1,password)
    req.login(registerUser,(err)=>{
        if(err){
            return next(err)
        }
         req.flash("success","welcome to wanderlust");
         let redirectUrl = res.locals.redirectUrl || "/listings";
       return res.redirect(redirectUrl); 
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.login= async (req,res)=>{
    req.flash("success","welcome to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}