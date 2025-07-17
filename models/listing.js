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
        url:String,
        filename:String,
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