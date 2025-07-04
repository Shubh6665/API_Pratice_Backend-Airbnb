const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js"); 

module.exports.postReview=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; //req.user is set by the isLoggedIn middleware
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Added Successfully!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//$Pull Oper. Kisi array field se value ko remove karta hai (agar match kare).
    await Review.findOneAndDelete(reviewId);
    req.flash("success","Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
}