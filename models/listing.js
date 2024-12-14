const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews.js');
let link = "https://smithbrothersconstruction.com/wp-content/uploads/2014/04/3KapaluaPl-566-Edit.jpg";

let listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    // img : {
    //     type : String,
    //     default : link,
    //     set : v => v === "" ? link : v 
    // },
    img:{
        url : String,
        filename : String,
    },
    price : {
        type : Number,
        required : true,
        default : 10000,
    },
    location : {
        type : String,
        required : true,
        default : 'Swarg'
    },
    country : {
        type : String,
        required : true,
        default: 'India'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }
    // ...Future task existing fields ...
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    // reviewCount: {
    //     type: Number,
    //     default: 0
    // },
    // isSuperhost: {
    //     type: Boolean,
    //     default: false
    // },
    // views: {
    //     type: Number,
    //     default: 0
    // },
    // availability: {
    //     type: String,
    //     enum: ['Available Now', 'Coming Soon', 'Rented'],
    //     default: 'Available Now'
    // }
});

listingSchema.post('findOneAndDelete', async function (listing){
    if(listing)
    {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

module.exports = mongoose.model('Listing', listingSchema);