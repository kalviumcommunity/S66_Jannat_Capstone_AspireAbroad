const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    countryresidence:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        enum:[
            'Australia','Canada','UK','USA'
    ],
        required:true
    },
    visaType:{
        type:String,
        enum:[
            'Tourist Visa',
            'Study Visa',
            'Work Visa',
            'Permanent Residence'
        ],
        required:true
    },
    password: {
        type: String,
        required: true,
      },
      termsAccepted:{
        type:Boolean,
        required:true,
        default:false
      }
})
module.exports=mongoose.model('user',userSchema)