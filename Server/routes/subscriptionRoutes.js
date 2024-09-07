

const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// Get a single subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Create a new subscription
router.post('/', subscriptionController.createSubscription);

// Update a subscription by ID
router.put('/:id', subscriptionController.updateSubscription);

// Delete a subscription by ID
router.delete('/:id', subscriptionController.deleteSubscription);
module.exports = router;
