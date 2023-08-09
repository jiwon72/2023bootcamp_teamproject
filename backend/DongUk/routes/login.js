// routes/login.js
const express = require("express");
const router = express.Router();
const { setCookie } = require("../helpers/cookieHelper"); // Import cookie helper function
const fs = require("fs");
const path = require("path");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "user.json");

// Sample in-memory user data (for demonstration purposes)
const readUsers = () => {
  try {
    const usersJson = fs.readFileSync(userFilePath, "utf8");
    console.log("before" + JSON.parse(usersJson));
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error reading users from file:", error.message);
    return [];
  }
};
const users = readUsers(); // Function to read users from the JSON file

console.log("readUsers" + users);
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
  console.log(req.session.user);
  // Respond with a success message.
  return res.json({ isLoggedIn: true, message: "Login successful" });
});

module.exports = router;
