//Step 4 yaha pr hm db se connect kr rhe hai aur sare 
// data ko db me insert kr rhe h uske liye jo sample data 
// data.js me wo aur Listing schema ko require kr rhe h
const mongoose=require("mongoose");
const initData = require ("./data");
const Listing = require("../models/listing");

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
  
const initDB=async()=>{
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj)=>({
        ...obj, owner:"684fed7a72b41d09af4a578e"
    }));
    //obj: Represents each object in the array during iteration.
    //...obj: Copies all properties of the object into a new object.
    //.map(): Creates a new array by transforming each object.
    //Purpose: Add the owner property to each listing without modifying the original array.

    await Listing.insertMany(initData.data);//yaha pr hm data.js 
    // se jo object k form me data:sampleListing export kiye hai 
    // usko yaha pr hm initData.data se uss key ko access kr rhe h
    console.log("data was initialized");
}

initDB();