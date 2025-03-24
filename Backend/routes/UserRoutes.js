const express=require('express')
const router=express.Router()
const {enroll,login}=require('../controllers/UserController')

router.post('/enroll',enroll)
router.post('/stepIn',login)

module.exports=router

