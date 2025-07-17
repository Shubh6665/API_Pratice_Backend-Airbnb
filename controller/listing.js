const Listing = require("../models/listing.js");

module.exports.index= async (req, res) => {
    const allListings = await Listing.find({}); //yha pr hmne sare listings ko ek var me store kiya hai aur phir render
    res.render("./listings/index.ejs", { allListings });
}

module.exports.newListing = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listingid = await Listing.findById(id)
        .populate({ 
            path: "reviews",
            populate: {
                path: "author",
            }
        })
        .populate("owner");


    if (!listingid) {
        req.flash("error", "Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listingid });
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename= req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename }; 
    // Assign the logged-in user's ID to the owner field
    //req.user._id: Represents the ID of the currently logged-in user.
    await newListing.save();
    req.flash("success", "New Listing Created Successfully!");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listingid = await Listing.findById(id);
    if (!listingid) {
        req.flash("error", "Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listingid });
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
}