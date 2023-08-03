// routes/login.js
const express = require("express");
const router = express.Router();
const { setCookie } = require("../helpers/cookieHelper"); // Import cookie helper function

// Sample in-memory user data (for demonstration purposes)
const users = [
  { userID: "user1", password: "password1" },
  { userID: "user2", password: "password2" },
];

// Login route
router.post("/", (req, res) => {
  const { userID, password } = req.body;
  // Find the user with matching credentials in the array (replace this with a database query in a real application)
  const user = users.find(
    (user) => user.userID === userID && user.password === password
  );

  if (!user) {
    return res.status(401).json({ isLoggedIn: false, message: "Login fail" });
  }

  // User authentication successful. Set a session flag to indicate that the user is logged in.
  req.session.user = { userID: userID };
  // Respond with a success message.
  return res.json({ isLoggedIn: true, message: "Login successful" });
});

module.exports = router;
