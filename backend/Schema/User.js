const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    company:{
        required:true,
        type:String,
        
    },
    manager:{
        required:true,
        type:String,

    },
    email:{
        required:true,
        type:String,
        unique:true

    },
    password:{
        required:true,
        type:String

    },
    emailToken:{
        type:String
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    phoneNumber:{
        required:true,
        type:String
    },
    isChecked:{
        default:false,
        type:Boolean
    },
    authtoken:{
        type: String
    },
    logo:{
        type:String,
        default: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png'
    },
    cin:{
        type:String,
        default:''
    },
    pan:{
        type:String,
        default:''
    },
    gstin:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:'India'
    },
    pincode:{
        type:String,
        default:''
    },
    category:{
        type:String,
        default:''
    },
    about:{
        type:String,
        default:''
    },
    state:{
        type:String,
        default:''
    },
    
    
})
const User = new mongoose.model('User',UserSchema);

module.exports = User
