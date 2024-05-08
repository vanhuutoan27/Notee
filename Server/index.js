// Importing necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Use CORS
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/Notee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Register User
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({ message: 'Full name is required' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // If not, proceed to hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // Return the user data excluding the password
    const { password: _, ...userData } = newUser._doc;
    res.status(201).json({
      message: 'User registered successfully',
      userData: userData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user', error });
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    res.json({
      message: 'Login successful',
      userData: { id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
