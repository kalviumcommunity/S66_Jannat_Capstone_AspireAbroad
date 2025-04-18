const express=require('express')
const router=express.Router();
const {createAppointment, getAppointmentsByUserId}=require('../controllers/AppointmentController')
const authenticate=require('../middleware/authenticate')

router.post('/appointment', authenticate, createAppointment)
router.get('/appointment/:userId',authenticate,getAppointmentsByUserId)

module.exports=router
