const Listing = require("../models/listing.js");
const {schemaValidation , reviewValidator} = require("./schemaValidation.js");
const CustomError = require("./customError.js");

module.exports.isLoggedIn = function(req, res, next) {
    if( !req.isAuthenticated() ) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error",'You must be logged in');
        return res.redirect("/login");
      }
      next();
}

module.exports.validateListing = (req, res, next) => {
  const { error } = schemaValidation.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, msg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewValidator.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, msg);
  } else {
    next();
  }
};


module.exports.saveRedirectUrl = (req , res, next) => {
  if( req.session.redirectUrl ) res.locals.redirectUrl = req.session.redirectUrl;
  next();   
}

module.exports.isOwner = async function(req, res, next) {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if(! listing.owner._id.equals(res.locals.currUser._id))
  {
    req.flash("error", "You are not authorized to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
}