if(process.env.NODE_ENV != "production"){
   require("dotenv").config();
}
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require('method-override');
const ejsMate=require("ejs-mate")
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
app.locals.dayjs = dayjs; // make available in EJS

const store=MongoStore.create({
    mongoUrl:process.env.DB_LINK,
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
    // console.log(req.user)
    next();
})


app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRoutes);
app.use("/",userRoutes);
app.get("/",(req,res)=>{
    res.redirect("/listings")
})
main()
.then(()=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(process.env.DB_LINK);
}

app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("./listings/error.ejs",{message});
})


app.listen(8080,()=>{
    console.log("server is listening");
});
