const Appointment=require('../models/appointment.model')
const User=require('../models/user.model')
const createAppointment=async(req,res)=>{
    try{
        const { service, country, date, time, consultationMode, notes } = req.body;
        const userId=req.user.userID;
        const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const appointment = new Appointment({
        user: userId,
        service,
        country,
        date,
        time,
        consultationMode,
        notes
      });
  
      await appointment.save();
      res.status(201).json({
        message: 'Appointment created successfully',
        appointment
    })
}  catch (error) {
    res.status(500).json({ message: error.message });
}}

const getAppointmentsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; 

        
        const appointments = await Appointment.find({ user: userId }).populate('user', 'firstname lastname email phonenumber');

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this user' });
        }

        res.status(200).json({
            message: 'Appointments fetched successfully',
            appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={createAppointment,getAppointmentsByUserId}
