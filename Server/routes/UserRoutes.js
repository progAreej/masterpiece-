const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../config/auth');

// Sign up route (no auth needed)
router.post('/signup', UserController.signup);

// Login route (no auth needed)
router.post('/login', UserController.login);

// Protected route example (requires authentication)
router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;
