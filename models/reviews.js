const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
    comment : {
        type:String,
        required : true
    },
    rating:{
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);