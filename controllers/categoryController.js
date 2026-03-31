const Listing=require("../models/listing");

function renderListings(allListings,req,res,category){
        if(!allListings.length){
        req.flash("error",`Currently there is no any listings of ${category}`)
        return res.redirect("/listings")
    }
    res.render("./listings/index.ejs",{allListings});
}
module.exports.trendListing=async(req,res)=>{
    let allListings=await Listing.find({}).populate("reviews").populate("owner");;
    allListings = allListings.filter((listing) =>
    listing?.reviews?.length > 2 &&
    listing.reviews.every((review) => review.rating === 5)
);
    renderListings(allListings,req,res,"trending");
}
module.exports.campListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'camp'});
    renderListings(allListings,req,res,"camping")
}
module.exports.poolsListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'amazing pool'});
    renderListings(allListings,req,res,"pools");
}
module.exports.farmsListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'farm'});
    renderListings(allListings,req,res,"farm");
}
module.exports.castleListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'castle'});
    renderListings(allListings,req,res,"castle");
}
module.exports.mountainListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'mountain'});
    renderListings(allListings,req,res,"mountain");
}
module.exports.cityListing=async(req,res)=>{
    let allListings=await Listing.find({category2:'Iconic Cities'});
    renderListings(allListings,req,res,"Iconic Cities");
}