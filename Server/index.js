// Importing necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Note = require('./models/note.model');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Use CORS
app.use(cors());

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/Notee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

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

// Get User
app.get('/get-user', async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(401).json({ message: 'User not found' });
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: '',
  });
});

// // Get all Notes
// app.get('/get-all-notes', async (req, res) => {
//   const { user } = req.user;

//   try {
//     const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
//     return res.json({ notes, message: 'All notes retrieved successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error getting notes', error });
//   }
// });

// // Add Note
// app.post('/add-note', async (req, res) => {
//   const { title, content, tags } = req.body;
//   const { user } = req.user;

//   if (!title) {
//     return res.status(400).json({ message: 'Title is required' });
//   }

//   if (!content) {
//     return res.status(400).json({ message: 'Content is required' });
//   }

//   try {
//     const note = new Note({
//       title,
//       content,
//       tags: tags || [],
//       userId: user._id,
//     });

//     await note.save();

//     return res.json({
//       note,
//       message: 'Note added successfully',
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error adding note', error });
//   }
// });

// // Edit Note
// app.put('/edit-note/:noteId', async (req, res) => {
//   const noteId = req.params.noteId;
//   const { title, content, tags, isPinned } = req.body;
//   const { user } = req.user;

//   if (!title && !content && !tags && !isPinned) {
//     return res.status(400).json({ message: 'No changes provided' });
//   }

//   try {
//     const note = await Note.findOne({ _id: noteId, userId: user._id });

//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }

//     if (title) note.title = title;
//     if (content) note.content = content;
//     if (tags) note.tags = tags;
//     if (isPinned) note.isPinned = isPinned;

//     await note.save();

//     return res.json({
//       note,
//       message: 'Note updated successfully',
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error editing note', error });
//   }
// });

// // Delete Note
// app.delete('/delete-note/:noteId', async (req, res) => {
//   const noteId = req.params.noteId;
//   const { user } = req.user;

//   try {
//     const note = await Note.findOne({ _id: noteId, userId: user._id });

//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }

//     await Note.deleteOne({ _id: noteId, userId: user._id });

//     return res.json({
//       message: 'Note deleted successfully',
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error deleting note', error });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
