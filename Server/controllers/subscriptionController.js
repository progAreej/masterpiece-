
const Subscription = require('../models/SubscriptionPlan');
const User = require('../models/Users'); // Adjust the path as necessary


// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve subscriptions.' });
  }
};

// Get a single subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve subscription.' });
  }
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    const savedSubscription = await newSubscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create subscription.' });
  }
};

// Update a subscription by ID
exports.updateSubscription = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedSubscription) {
      res.status(200).json(updatedSubscription);
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update subscription.' });
  }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (deletedSubscription) {
      res.status(200).json({ message: 'Subscription deleted successfully' });
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subscription.' });
  }
};


