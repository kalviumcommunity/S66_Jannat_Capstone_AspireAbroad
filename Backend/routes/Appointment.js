const express=require('express')
const router=express.Router();
const {createAppointment, getAppointmentsByUserId,updateAppointmentStatus}=require('../controllers/AppointmentController')
const authenticate=require('../middleware/authenticate')

router.post('/appointment', authenticate, createAppointment)
router.get('/appointment/:userId',authenticate,getAppointmentsByUserId)
router.put('/appointment/:id',updateAppointmentStatus)

module.exports=router
