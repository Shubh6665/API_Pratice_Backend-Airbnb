//Step 2 Create a Schema for the dbs

const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema= mongoose.Schema;

const listingSchema= new Schema ({
    title: {
        type: String,
        required:true,
    },     
    description: String,
    image:{
        type: String,
        default: "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg",
        set:(v) => v==="" ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : v ,
        //For the image used but empty , to show we use set :(v) => v === "" ? "link" : v
    },
    price:Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})

//Middleware to delete reviews when listings are deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
//it will create a dbs collection of listings(plural form)
module.exports =Listing;
//it should be module not modules and exports not export