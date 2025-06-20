const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema  } = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/Expresserror.js"); 
const {isLoggedIn} = require("../middleware.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}

//Index Route
router.get("/",wrapAsync(async(req,res)=>{
const allListings=await Listing.find({}); //yha pr hmne sare listings ko ek var me store kiya hai aur phir render
res.render("./listings/index.ejs",{allListings});
}));

//New Route
router.get("/new",isLoggedIn,(req,res)=>{
    
    res.render("./listings/new.ejs");
})

//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listingid=await Listing.findById(id).populate("reviews");
    if(!listingid){
        req.flash("error","Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listingid});
}));

//Create Route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created Successfully!");
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listingid = await Listing.findById(id);
    if(!listingid){
        req.flash("error","Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs" ,{listingid});
}));

//Update Route
router.put("/:id",isLoggedIn, validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id" ,isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deletedList=await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success","Listing Deleted Successfully!");
    res.redirect("/listings");
}));

module.exports = router;