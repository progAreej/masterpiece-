// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/contactController');

// POST /api/contact
router.post('/contact', sendMessage);

module.exports = router;
