const express = require('express');
const routers = express.Router();
const multer  = require('multer');
const {storage}=require("../cloudinary.js")
const upload = multer({storage})
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const controllerListing = require("../controllers/listingController.js");

routers
.route("/")
.get(wrapAsync(controllerListing.index))
.post(
isloggedIn,
upload.single("listing[image]"),
validateListing,
wrapAsync(controllerListing.createListing),
);

routers.get("/new", isloggedIn, controllerListing.renderNewForm);

routers
.route("/:id")
.get(wrapAsync(controllerListing.showListing))
.patch(isloggedIn,
    upload.single("listing[image]"),
    isOwner,
    validateListing, 
    wrapAsync(controllerListing.updateListing))
.delete(isloggedIn, isOwner, wrapAsync(controllerListing.destroyListing));

routers.get("/:id/edit",
    isloggedIn,
    isOwner,
    wrapAsync(controllerListing.renderEditForm)
);

module.exports = routers;