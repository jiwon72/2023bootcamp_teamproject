// routes/register.js
const express = require("express");
const router = express.Router();

// Sample in-memory user data (for demonstration purposes)
const users = [];

// Registration route
router.post("/", (req, res) => {
  const { username, password, nickname, userID } = req.body;

  // Check if the username already exists in the users array
  const existingUser = users.find((user) => user.userID === userID);
  if (existingUser) {
    return res
      .status(409)
      .json({ isRegistered: false, error: "UserID already exists" });
  }

  // Save the user data in the users array (replace this with a database insert in a real application)
  users.push({ username, password, nickname, userID });

  // Registration successful
  return res.json({ isRegistered: true, message: "Registration successful" });
});

module.exports = router;
