// controllers/contactController.js
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new message entry in the database
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
