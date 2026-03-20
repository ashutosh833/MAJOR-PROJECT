if(process.env.NODE_ENV != "production"){
   require("dotenv").config();
}

// comsole.log(process.env.SECRET);

const express=require('express');
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require('method-override');
const ejsMate=require("ejs-mate")
const dbUrl=process.env.DB_LINK
const ExpressError = require("./utils/ExpressError.js");
const listingRoutes=require("./routes/listingRoutes.js");
const reviewRoutes=require("./routes/reviewRoutes.js");
const userRoutes=require("./routes/userRoutes.js");
const session=require('express-session');
const MongoStore=require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsMate);

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})
store.on("error",(error)=>{
    console.log("error in mongo",error)
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}

app.use(session(sessionOptions))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRoutes);
app.use("/",userRoutes);

main()
.then(()=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

// app.use((err,req,res,next)=>{
//     let {statusCode=500,message="something went wrong!"}=err;
//     res.status(statusCode).render("./listings/error.ejs",{message})
//     res.status(statusCode).send(message);
// })
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("./listings/error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("server is listening");
});