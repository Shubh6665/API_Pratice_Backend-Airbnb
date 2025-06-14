const express = require('express');
const router = express.Router({mergeParams:true});//mergeParams:true allows us to access params from the parent route (listing id in this case)
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js"); 
const ExpressError = require("../utils/Expresserror.js"); 

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let msg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

//Reviews POST Route
router.post("/",validateReview, wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
})); 


//Reviews DELETE Route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//$Pull Oper. Kisi array field se value ko remove karta hai (agar match kare).
    await Review.findOneAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))

module.exports=router;