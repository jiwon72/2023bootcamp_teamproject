// routes/login.js

const express = require('express');
const router = express.Router();

// Sample in-memory user data (for demonstration purposes)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// Login route
router.post('/', (req, res) => {
console.log(req)
  const { username, password } = req.body;

  // Find the user with matching credentials in the array (replace this with a database query in real application)
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Here, you could generate a token or set a session to handle authentication
  // For simplicity, we'll just respond with a success message.
  res.json({ message: 'Login successful' });
});

module.exports = router;
