const express=require('express')
const router= express.Router()
const {postBlog, getBlog}=require('../controllers/BlogController')
router.post('/blog',postBlog)
router.get('/blog',getBlog)
module.exports=router

