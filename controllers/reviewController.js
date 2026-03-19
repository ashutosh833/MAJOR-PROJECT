const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.commenter=req.user._id;
    listing.reviews.push(newReview);
    // newReview.rating=Number(newReview.rating);
    await newReview.save();
    await listing.save();
    if(!newReview.rating){
        req.flash("error","please give star rating");
        res.redirect(`/listings/${listing._id}`); 
    }
    req.flash("success","your review is added");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted successfully");
    res.redirect(`/listings/${id}`);
}