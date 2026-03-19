const Listing=require("./models/listing");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js")



module.exports.isloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}

module.exports.isOwner=async (req,res,next)=>{
   try{
     let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have access");
        return res.redirect(`/listings/${id}`);
    }
    next();
   }catch(err){
     req.flash("error",err.message);
   }
}

module.exports.validateListing=async (req,res,next)=>{
let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        console.dir(errMsg,error.details);
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview=async (req,res,next)=>{
let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        console.dir(errMsg,error.details);
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
