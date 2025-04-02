const express=require('express')
const router=express.Router()
const {getcolleges}=require("../controllers/StudyController.js")

router.get('/college',getcolleges)
module.exports=router