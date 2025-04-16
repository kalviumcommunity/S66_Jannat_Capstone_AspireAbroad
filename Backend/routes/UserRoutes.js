const express=require('express')
const router=express.Router()
const {enroll,login}=require('../controllers/UserController')
const authenticate=require('../middleware/authenticate')

router.post('/enroll',enroll)
router.post('/stepIn',login)

module.exports=router

