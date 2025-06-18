const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
   user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required:true
}
,  
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: null
  }
});


module.exports = mongoose.model('step', stepSchema);

