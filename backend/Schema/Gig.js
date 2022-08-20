const mongoose = require('mongoose');



const gigSchema =  new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    amount:{
        type:Number
    },
    task:{
        type:Array
    },
    authtoken:{
        type:String
    }


})
const Gig = new mongoose.model('Gig',gigSchema);

module.exports = Gig