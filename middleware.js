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