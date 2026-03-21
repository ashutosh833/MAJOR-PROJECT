const express=require('express');
let routers=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isloggedIn}=require("../middleware.js");
const ReviewController=require("../controllers/reviewController");



routers.post("/",isloggedIn,validateReview,wrapAsync(ReviewController.createReview));

routers.delete("/:reviewId",wrapAsync(ReviewController.destroyReview));

module.exports=routers;