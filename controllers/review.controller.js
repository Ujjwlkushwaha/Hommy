let Listing = require("../models/listing.js");
let Review = require("../models/reviews.js");

module.exports.deleteReview = async (req, res, next) => {
    let { id, review_id } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash('success','Review deleted successfully')
    res.redirect(`/listings/${id}`);
  }


  module.exports.createReview = async (req, res, next) => {
    try {
      let { rating, comment } = req.body;
      let id = req.params.id;
      let review = new Review({ rating, comment, listing: id });
      review.author = req.user._id;

      console.log(review);
      let listing = await Listing.findById(id);
      listing.reviews.push(review);
      await review.save();
      await listing.save();
      req.flash('success','Review added successfully')
      res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }