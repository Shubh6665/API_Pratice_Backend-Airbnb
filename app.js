const express = require("express");
const app = express();
const  mongoose = require("mongoose") ;
// const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
//const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/Expresserror"); 
//const Review = require("./models/reviews");
//const {listingSchema , reviewSchema } = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})
    
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
  }
  
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs" ,ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions={
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 1000*7*24*60*60,
        maxAge: 1000*7*24*60*60, 
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

//Passport Configuration after session option as for different tab user will be logged in
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser =req.user; //to access current user in all templates
    next();
})

//Server Side Validation for Listing(JOI)
// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//         let msg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,msg);
//     }
//     else{
//         next();
//     }
// }

//Server Side Validation for Reviews(JOI)
// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);
//     if(error){
//         let msg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,msg);
//     }else{
//         next();
//     }
// }

app.get("/",(req,res)=>{
    res.send("Hi, I am Root");
})

//Fake User Registration Route
// app.use("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"student"
//     })
// 
//     let registeredUser = await User.register(fakeUser,"password123");
//     res.send(registeredUser);
// })


app.use("/listings", listingRouter); 
app.use("/listings/:id/reviews",reviewRouter);//yha se id params sirf app.js me rh ja rha review.js router me nhi j rha
 //Parent route me jo params hai unko child route se merge krna hai to
app.use("/",userRouter); 



//  //Index Route(Step 5)
// app.get("/listings",wrapAsync(async(req,res)=>{
//     const allListings=await Listing.find({}); //yha pr hmne sare listings ko ek var me store kiya hai aur phir render
//     res.render("./listings/index.ejs",{allListings});
// }));

//New Route(Step 7 i)

// jb bhi new listing bnani hoti hai toh do kaam krna hota hai 
// get request(New) aur post request(Create)
// get request se new.ejs file ko render krna hota hai
// post request se data ko db me insert krna hota hai


// app.get("/listings/new",(req,res)=>{
//     res.render("./listings/new.ejs");
// })

//Show Route(Step 6)
// app.get("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listingid=await Listing.findById(id).populate("reviews");
//     res.render("./listings/show.ejs",{listingid});
// }));

//Crete Route(Step 7 ii)
// app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
    
    // 1st way -> let {title,description,image,price,location,country}=req.body;
    // 2nd way -> let listing=req.body.listing;  new Listing(listing);
    // optimized of 2nd way

    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid Lisiting Data");
    // }

    // const newListing=new Listing(req.body.listing);
    // await newListing.save();
    // res.redirect("/listings");
// }));

//Edit Route (Step 8 i)
// app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//     let{id}=req.params;
//     const listingid = await Listing.findById(id);
//     res.render("./listings/edit.ejs" ,{listingid});
// }));


//Update Route (Step 8 ii)
// app.put("/listings/:id", validateListing,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));

//Delete Route (Step 9)
// app.delete("/listings/:id" ,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const deletedList=await Listing.findByIdAndDelete(id);
//     console.log(deletedList);
//     res.redirect("/listings");
// }));

// //Reviews POST Route
// app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req,res)=>{
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`);
// })); 


// //Reviews DELETE Route
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
//     let {id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//$Pull Oper. Kisi array field se value ko remove karta hai (agar match kare).
//     await Review.findOneAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// }))

// TestingSample Listing

// app.get("/testlisting",async(req,res)=>{
//     //here we r using Listing Schema using new Listing, to create sample Listing to check the working
//     let sample=new Listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 1500,
//         location: "Calangute, Goa",
//         country: "India"
//     })

//     await sample.save();
//     console.log("Sample saved");
//     res.send("Testing Successful");
// })

// Error Handling Middleware
app.all("*",(req,res,next)=>{
    next(new ExpressError(404, "Page Not Found!")); 
})

app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something Went Wrong!"}=err;
    //res.status(statusCode).send(message );
     res.status(statusCode).render("error.ejs",{err});
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
