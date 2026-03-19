const express=require('express');
let routers=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
// const Listing=require('../models/listing.js');
const Review=require('../models/review.js');
const {validateReview,isloggedIn}=require("../middleware.js");
const ReviewController=require("../controllers/reviewController");



routers.post("/",isloggedIn,validateReview,wrapAsync(ReviewController.createReview));

routers.delete("/:reviewId",wrapAsync(ReviewController.destroyReview));

module.exports=routers;