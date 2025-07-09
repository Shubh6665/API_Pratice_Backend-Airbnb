if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
 

const express = require("express");
const app = express();
const  mongoose = require("mongoose") ;
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/Expresserror"); 
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

app.get("/",(req,res)=>{
    res.send("Hi, I am Root");
})


app.use("/listings", listingRouter); 
app.use("/listings/:id/reviews",reviewRouter);//yha se id params sirf app.js me rh ja rha review.js router me nhi j rha
 //Parent route me jo params hai unko child route se merge krna hai to merge params review file me true krdo import me
app.use("/",userRouter); 

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
