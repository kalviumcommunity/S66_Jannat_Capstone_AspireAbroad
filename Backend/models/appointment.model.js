const mongoose=require('mongoose')
const appointmentSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    service:{
        type:String,
        required:true,
        enum: ['Visa Application', 'Permanent Residency', 'Citizenship', 'Document Review'],
    },
    country: {
        type: String,
        required: true,
        enum: ['Canada', 'United States', 'United Kingdom', 'Australia']
      },
      date: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true,
        enum: ['Morning', 'Afternoon', 'Evening']
      },
      consultationMode: {
        type: String,
        required: true,
        enum: [ 'In Person meeting', 'Google Meet','Microsoft Teams', 'Live Chats Session'],
        default: 'zoom'
      },
      notes: {
        type: String,
        default: ''
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})
const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
