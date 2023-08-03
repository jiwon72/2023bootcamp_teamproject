// routes/logout.js
const express = require("express");
const router = express.Router();

// Logout route
router.post("/", (req, res) => {
  // Clear the session data and mark the user as logged out
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "An error occurred during logout" });
    }
    // Successful logout
    return res.json({ message: "Logout successful" });
  });
});

module.exports = router;
