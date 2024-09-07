const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use CORS middleware
app.use(cors());


// ---------------------------------------require
const verifyToken = require('./config/auth');
const userRoutes = require('./routes/UserRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const beekeepersRoutes = require('./routes/beekeepersRoutes');


// ----------------------------------------end points
app.use('/api', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', beekeepersRoutes);

// Example of a protected route
app.get('/api/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Use CORS middleware
// app.use(cors());

// // Import routes
// const verifyToken = require('./config/auth');
// const userRoutes = require('./routes/UserRoutes');
// const contactRoutes = require('./routes/contactRoutes');

// // Use routes
// app.use('/api', contactRoutes);
// app.use('/api/users', userRoutes);

// // Example of a protected route
// app.get('/api/protected', verifyToken, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route.' });
// });

// // Handle 404 errors
// app.use((req, res, next) => {
//   res.status(404).send("Page Not Found");
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
