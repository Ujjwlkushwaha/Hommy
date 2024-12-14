const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrapper = require("../utils/asyncWrapper.js");
const multer = require('multer');
const {storage } = require('../cloudConfig.js');
const parser = multer({storage});

const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../utils/middleware.auth.js");

const {
  newListingForm,
  showListing,
  createListing,
  showProperty,
  updateListingForm,
  updateListings,
  deleteListing,
} = require("../controllers/listings.controller.js");

//✅ ****create a new data****
router
  .route("/new")
  .get(isLoggedIn, newListingForm)
  .post(isLoggedIn,parser.single('img') ,validateListing, asyncWrapper(createListing));
  // .post(parser.single('img') , function(req , res){
  //   console.log(req.file);
    /*
        {
            fieldname: 'img',
            originalname: 'certificate.png',
            encoding: '7bit',
            mimetype: 'image/png',
            path: 'https://res.cloudinary.com/dx9zdylxh/image/upload/v1733111407/airbnb/nfcziu3s0gvjbkxf3oor.png',
            size: 18434,
            filename: 'airbnb/nfcziu3s0gvjbkxf3oor'
          }
    */
//     res.send('done')
// })



//✅****show all listed properties*************

router.get("/", asyncWrapper(showListing));
router.route("/:id")
.get(asyncWrapper(showProperty))
.delete(
  isLoggedIn, // login hone chahiye
  isOwner, // Delete krne ke liye owner bhi hone chahiye
  asyncWrapper(deleteListing)
);

// ✅ update route for updating information********
router
  .route("/:id/edit")
  .get(
    isLoggedIn, // logged in hone chahiye
    isOwner, // update krne ke liye owner bhi hone chahiye
    asyncWrapper(updateListingForm)
  )
  .put(
    isLoggedIn, // User must be logged in to access this route
    isOwner, // update krne ke liye owner bhi hone chahiye
    parser.single('img') ,
    validateListing,
    asyncWrapper(updateListings)
  );

module.exports = router;
