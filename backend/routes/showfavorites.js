const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "favorite.json");

// Function to read users from the JSON file
const readFavorites = () => {
  try {
    const usersJson = fs.readFileSync(userFilePath, "utf8");
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error reading users from file:", error.message);
    return [];
  }
};

// Get favorite route
router.get("/", (req, res) => {
  const userSession = req.session.user;
  if (!userSession) {
    return res.status(401).json({ message: "Session expired. Please login." });
  }

  // Read existing favorites from the JSON file
  let favorites = readFavorites();

  let userIndex = null;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].userId === userSession.userID) {
      userIndex = i;
    }
  }

  // If user doesn't exist in the favorites, return error
  if (userIndex === null) {
    return res.status(404).json({ message: "User not found in favorites." });
  }

  // Respond with the favorite list
  return res.json({
    favorites: favorites[userIndex].favoriteList,
    message: "Successfully retrieved favorites.",
  });
});
module.exports = router;
