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
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params; // Or appointmentId, based on your route
        console.log("Attempting to update appointment with ID:", id); // Add this for clarity

        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const appointment = await Appointment.findById(id); // THIS IS THE MOST LIKELY SPOT FOR A CASTERROR

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        appointment.status = status;
        appointment.updatedAt = Date.now();

        await appointment.save();

        res.status(200).json({
            message: 'Appointment status updated successfully',
            appointment
        });

    } catch (error) {
        // ⭐⭐⭐ IMPORTANT: Log the error here to see the details ⭐⭐⭐
        console.error("Server Error in updateAppointmentStatus:", error);
        res.status(500).json({ message: error.message || 'An unknown server error occurred' });
    }
};

module.exports={createAppointment,getAppointmentsByUserId,updateAppointmentStatus}
