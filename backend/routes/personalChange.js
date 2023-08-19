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
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error reading users from file:", error.message);
    return [];
  }
};

// Sample data for demonstration purposes
let users = readUsers(); // Read users from file

// Define the route for updating user profiles
router.post("/:userId/profile", (req, res) => {
  const userId = req.params.userId;
  console.log(`Updating user profile for userId: ${userId}`);

  const nickname = req.body.nickname;
  const password = req.body.password;

  const userIndex = users.findIndex((user) => user.userID === userId);

  if (userIndex === -1) {
    console.log(`User not found for userId: ${userId}`);
    return res.status(404).json({ error: "User not found" });
  }

  // Update user's nickname and password
  users[userIndex].nickname = nickname || users[userIndex].nickname;
  users[userIndex].password = password || users[userIndex].password;

  // Save updated users back to the file
  fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error saving user data to file:", err.message);
      return res
        .status(500)
        .json({ isUpdated: false, error: "Error saving user data" });
    } else {
      console.log("User data updated and saved to user.json successfully.");
      console.log("Updated user profile:", users[userIndex]);
      res.json({ issucces: true });
    }
  });
});

module.exports = router;
