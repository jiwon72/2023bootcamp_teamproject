// routes/logout.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "user.json");
// Function to read users from the JSON file
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

// Logout route
router.post("/", (req, res) => {
  //check if user is logged in
  const sessionUser = req.session.user;
  console.log(JSON.stringify(sessionUser));
  const users = readUsers();
  if (sessionUser) {
    const user = users.find((user) => user.userID === sessionUser.userID);
    return res.json({ isDark: user.isDark });
  } else {
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "session expired login again" });
  }
});

module.exports = router;
