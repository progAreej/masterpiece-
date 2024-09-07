
const mongoose = require('mongoose');
// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phoneNumber: { type: String },
  profilePicture: { type: String }, // URL or path to image
  role: { 
    type: String, 
    enum: ['customer', 'beekeeper'], 
    required: true 
  },
  apiaryLocation: { type: String }, // Only applicable for beekeepers
  experienceYears: { type: Number }, // Only applicable for beekeepers
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }, // Only applicable for beekeepers
  isApproved: { type: Boolean, default: false }, // Track approval status for beekeepers
  paymentDetails: {
    method: { 
      type: String, 
      enum: ['creditCard', 'paypal'],
      default: 'creditCard'},
    cardNumber: { 
      type: String, 
      // Ensure you handle card numbers securely and avoid storing them
      // Consider storing a token or ID from a payment provider instead
      select: false // This prevents the field from being retrieved in queries
    },
    expiryDate: { 
      type: String, 
      select: false // Prevents the field from being retrieved in queries
    },
    cvv: { 
      type: String, 
      select: false // Prevents the field from being retrieved in queries
    }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Automatically update the `updatedAt` field before saving
userSchema.pre('save', function (next) {
  if (this.isModified() || this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Define methods to handle user logic
userSchema.methods.isCustomer = function() {
  return this.role === 'customer';
};

userSchema.methods.isBeekeeper = function() {
  return this.role === 'beekeeper';
};

const User = mongoose.model('User', userSchema);
module.exports = User;
