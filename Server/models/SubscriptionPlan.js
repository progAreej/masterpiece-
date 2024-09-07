const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: String,
  price: String,
  features: [String],
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
