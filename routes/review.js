const express = require('express');
const router = express.Router({mergeParams:true});//mergeParams:true allows us to access params from the parent route (listing id in this case)
const wrapAsync = require("../utils/wrapAsync.js");


const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controller/review");



//Reviews POST Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview)); 


//Reviews DELETE Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports=router;