const Blog=require('../models/Blog.model')
const postBlog=async(req,res)=>{
    const {image,para,date,link}=req.body;
    if(!image || !para || !date || !link){
        return res.status(400).json({message:"All Fields are required"})
    }
    const done=await Blog.create({
        image,
        para,
        date,
        link,
    })
    return res.status(200).json({message:"Blog created Successfully"})
}

const getBlog = async(req,res)=>{
    const done=await Blog.find()
    return res.status(200).json(done)
}

module.exports={
    postBlog,
    getBlog
}

