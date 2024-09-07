// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/Users'); // Adjust the path as necessary

// exports.registerBeekeeper = async (req, res) => {
//     try {
//       const { username, email, password, fullName, phoneNumber, apiaryLocation, experienceYears } = req.body;
  
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists with this email' });
//       }
  
//       // Hash the password
//       const saltRounds = 10;
//       const passwordHash = await bcrypt.hash(password, saltRounds);
  
//       // Create a new user (beekeeper)
//       const newUser = new User({
//         username,
//         email,
//         passwordHash,
//         phoneNumber,
//         role: 'beekeeper',
//         apiaryLocation,
//         experienceYears
//       });
  
//       // Save the user to the database
//       await newUser.save();
  
//       // Generate a token
//       // const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
//       const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, SECRET_KEY, {
//         expiresIn: '1h',
//       });
  
//       res.status(201).json({
//         message: 'Beekeeper registered successfully!',
//         token: token
//       });
//     } catch (error) {
//       console.error('Error registering beekeeper:', error);
//       res.status(500).json({ message: 'Registration failed. Please try again.' });
//     }
//   };
  

// // Login controller
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Compare the provided password with the stored password hash
//     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
//       expiresIn: '1h', // Token expires in 1 hour
//     });

//     res.status(200).json({ message: 'Login successful!', token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Login failed. Please try again.' });
//   }
// };

// // Middleware to protect routes
// exports.protect = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized, no token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded; // Attach the user info to the request object
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized, invalid token' });
//   }
// };


require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Adjust the path as necessary

// Register beekeeper
exports.registerBeekeeper = async (req, res) => {
  try {
    const { username, email, password, fullName, phoneNumber, apiaryLocation, experienceYears } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user (beekeeper)
    const newUser = new User({
      username,
      email,
      passwordHash,
      phoneNumber,
      role: 'beekeeper',
      apiaryLocation,
      experienceYears
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Beekeeper registered successfully!',
      token: token
    });
  } catch (error) {
    console.error('Error registering beekeeper:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// Middleware to protect routes
exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};
