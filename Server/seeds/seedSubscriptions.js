const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as needed
const Subscription = require('../models/SubscriptionPlan'); // Adjust path as needed

const seedSubscriptions = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connection established');

    // Example subscription plans
    const plans = [
      {
        name: 'Free',
        price: '0 JOD/month',
        features: [
          'Access to public forum discussions',
          'Basic beekeeping articles',
          'Monthly newsletter',
        ],
      },
      {
        name: 'Paid',
        price: '7% fee on earnings / month',
        features: [
          'All Free plan features',
          'Download your products',
          '20% discount on Bee Wise products',
          'Early access to new content and features',
          'Personalized beekeeping advice',
          'Download exclusive beekeeping products',
        ],
      },
    ];

    // Clear existing subscriptions
    await Subscription.deleteMany({});

    // Insert new subscription plans
    const docs = await Subscription.insertMany(plans);
    console.log('Subscription plans inserted:', docs);

    await mongoose.connection.close(); // Close connection after seeding
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close(); // Close connection on error
  }
};

seedSubscriptions();
