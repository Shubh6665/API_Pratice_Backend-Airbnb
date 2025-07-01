const Listing = require("./models/listing");
const {listingSchema ,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/Expresserror.js"); 


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //Before login where the user was trying to go 
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You Must Be Logged In!");
        return res.redirect("/login");
    }
    next();
};


//req.session gets deleted by passport.authenticate when someone logs in so store in locals
//so run this before passport.authenticate
module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


//authenticate user 
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listid=await Listing.findById(id);
    if(!listid.owner._id.equals(res.locals.currUser._id)){   //req.user._id
        req.flash("error","You are not Owner of this Listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let msg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}