let Listing = require('../models/listing');
let Review = require('../models/reviews');

module.exports.newListingForm = (req, res) => {
    res.render("newForm");
  };
module.exports.createListing = async (req, res) => {
    let ower = req.user;

    // ✅ Extract url and filename from request object
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body);
    newListing.owner = ower;
    // ✅ store into db
    newListing.img = { url , filename};

    // console.log(newListing)
    
    await newListing.save();
    req.flash("success", "New listing created successfully");
    res.redirect("/listings");
    // res.send('Process done successfully')
};


module.exports.showListing = async (req, res) => {
    let allListingData = await Listing.find();
    res.render("index", { listings: allListingData });
  }

module.exports.showProperty=async (req, res, next) => {
    let { id } = req.params;

    let singleListingData = await Listing.findById(id).populate({path : 'reviews' , populate : { path : 'author'}}).populate('owner');

    if (!singleListingData) {
      req.flash("error", "Property not exists");
      res.redirect('/listings');
    }
    res.render("show", { listing: singleListingData });
  }

  module.exports.updateListingForm = async (req, res) => {
    let { id } = req.params;
    let singleListingData = await Listing.findById(id);

    if (!singleListingData) {
      req.flash("error", "Property not exists");
      res.redirect('/listings');
    }
   
    res.render("edit", { listing: singleListingData });
  }

  module.exports.updateListings = async (req, res) => 
  {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body}, { new: true });
    if(typeof req.file !== 'undefined')
    {
      let url = req.file.path;
      let filename = req.file.filename;
      await Listing.findByIdAndUpdate(id, { img: { url, filename } }, { new: true });
    }
    req.flash('success' , 'Modify Successfully')
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success' , 'Delete Successfully')
    res.redirect("/listings");
  };