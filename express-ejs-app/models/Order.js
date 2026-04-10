const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ROLE',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: String, required: true }
    }
  ],
  totalCost: {
    type: Number,
    required: true,
    default: 0
  },
  totalTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
