const mongoose = require('mongoose');
const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  order: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  countryresidence: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    enum: ['Australia', 'Canada', 'UK', 'USA'],
    required: true
  },
  visaType: {
    type: String,
    enum: ['Tourist Visa', 'Study Visa', 'Work Visa', 'Permanent Residence'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  steps: [stepSchema]
}, {
  timestamps: true, // adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Virtual: Appointments related to this user
userSchema.virtual('appointments', {
  ref: 'appointment',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// Virtual: Document data associated with this user
userSchema.virtual('documents', {
  ref: 'document',
  localField: '_id',
  foreignField: 'user',
  justOne: true // assuming one document record per user
});


module.exports = mongoose.model('user', userSchema);
