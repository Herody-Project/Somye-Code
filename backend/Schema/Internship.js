const mongoose = require('mongoose');



const internSchema =  new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    sdate:{
        type:String
    },
    adate:{
        type:String
    },
    authtoken:{
        type:String
    },
    duration:{
        type:String
    },
    category:{
        type:String
    },
    positions:{
        type:String
    },
    workplace:{
        type:String
    },
    abenefits:{
        type:String
    },
    skills:{
        type:String
    },
    stipend:{
        type:String
    },
    proof:{
        type:String
    },
    questions:{
        type:Array
    }

})
const Internship = new mongoose.model('Internship',internSchema);

module.exports = Internship