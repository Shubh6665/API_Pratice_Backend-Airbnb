const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index)) //index route
    .post(isLoggedIn, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.createListing)
    ); //create route
    

//New Route
router.get("/new", isLoggedIn, listingController.newListing)

router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //show route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;