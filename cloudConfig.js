// code for connect cloud storage to our project 
// goto npm multer-storage-cloudinary or cloudinary website 
// dekh lo kaise setup krte hai

// 🗡️ pasted from multer-storage-cloudinary npm 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

module.exports.storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'airbnb',
      allowedformats: ['png' , 'jpg' , 'jpeg'], // supports promises as well
    },
  });
   
   