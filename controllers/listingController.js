const Listing=require("../models/listing");
const {getCoordinates}=require("../js/script.js");

module.exports.index=async(req,res,next)=>{
    let {searchItem}=req.query;
    let allListings;

    if(!searchItem){
        searchItem="showall"
        allListings = await Listing.find({});
    }else{
        searchItem=searchItem.toLowerCase();
        allListings = await Listing.find({catagory:searchItem});
        console.log(allListings.length,"hi")
        if(allListings.length==0){
            req.flash("error",`No listing available on your request`);
            return res.redirect("/listings")
        }
    }
    // console.log(searchItem,allListings)
    res.render("./listings/index.ejs",{allListings,searchItem});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs"); 
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let showListing=await Listing.findById(id).populate({path:"reviews",populate:{path:"commenter",},}).populate("owner");
    if(!showListing){
        req.flash("error","listing you are searching for is unavailable");
        return res.redirect("/listings");
    }else{
    res.render("./listings/show.ejs",{showListing,tileUrl: process.env.API_MAP });
    }
}

module.exports.renderEditForm=async(req,res,next)=>{
     let {id}=req.params;
    let showListing=await Listing.findById(id);
    if(!showListing){
        req.flash("failure","listing you are searching for is unavailable");
       return res.redirect("/listings");
    }else{
    showListing.image.url=showListing.image.url.replace("/upload","/upload/w_200");
    res.render("./listings/edit.ejs",{showListing});
    }
}
// c_scale,w_200 makes it smaller (width 200px).
// e_blur:100 adds blur (use 1 to 2000; higher = blurrier).

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;

    // ✅ set category BEFORE updating
    req.body.listing.catagory = req.body.listing.country.toLowerCase();
    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true } // ✅ always use this
    );

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
console.log(listing)
    req.flash("success", "listing updated successfully");
    res.redirect(`/listings/${id}`);
};
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new Listing(req.body.listing);
    newlisting.catagory=newlisting.country.toLowerCase();

    // ✅ get coordinates from location
    const coordinate = await getCoordinates(newlisting.location);

    // 🚨 if location not found
    if (!coordinate) {
        req.flash("error", "Invalid location. Please enter a valid place.");
        return res.redirect("/listings/new");
    }

    // ✅ ALWAYS set geometry
    newlisting.geometry = {
        type: "Point",
        coordinates: [
            coordinate.lng, // ⚠️ lng first
            coordinate.lat  // ⚠️ lat second
        ]
    };

    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };

    await newlisting.save();

    req.flash("success", "New listing added successfully");
    res.redirect("/listings");
};

module.exports.destroyListing=async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing delete successfully");
    res.redirect("/listings");
}
   