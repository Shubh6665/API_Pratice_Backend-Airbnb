const express = require("express");
const app = express();
const  mongoose = require("mongoose") ;
const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");

 
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

app.get("/",(req,res)=>{
    res.send("Hi, I am Root");
})

 //Index Route(Step 5)
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({}); //yha pr hmne sare listings ko ek var me store kiya hai aur phir render
    res.render("./listings/index.ejs",{allListings});
})

//New Route(Step 7 i)
// jb bhi new listing bnani hoti hai toh do kaam krna hota hai 
// get request(New) aur post request(Create)
// get request se new.ejs file ko render krna hota hai
// post request se data ko db me insert krna hota hai
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})

//Show Route(Step 6)
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listingid=await Listing.findById(id);
    res.render("./listings/show.ejs",{listingid});
})

//Crete Route(Step 7 ii)
app.post("/listings",async(req,res)=>{
    // 1st way -> let {title,description,image,price,location,country}=req.body;
    // 2nd way -> let listing=req.body.listing;  new Listing(listing);
    // optimized of 2nd way
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route (Step 8 i)
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listingid = await Listing.findById(id);
    res.render("./listings/edit.ejs" ,{listingid});
})


//Update Route (Step 8 ii)
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id" ,async(req,res)=>{
    let {id}=req.params;
    const deletedList=await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
})

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


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
