const mongoose=require('mongoose')
const BlogSchema= new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    para:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now, 
      },
    link:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('blog',BlogSchema)
