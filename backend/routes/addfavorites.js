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

// Registration route
router.post("/", (req, res) => {
  const userSession = req.session.user;
  if (!userSession) {
    return res
      .status(401)
      .json({ isRegistered: false, message: "session expired login please" });
  }
  // Read existing users from the JSON file
  let favorites = readFavorites();
  console.log("beforeFavorites", favorites);
  //check if the movieID already exists in the favorites array
  let userIndex = null;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].userId === userSession.userID) {
      userIndex = i;
    }
  }
  //json에 user가 없으면 추가
  if (userIndex === null) {
    favorites.push({ userId: userSession.userID, favoriteList: [] });
  }
  console.log("findUser", favorites[userIndex]);
  const isExistingFavorite = favorites[userIndex].favoriteList.find(
    (favorite) => favorite.movieId === req.body.movieId
  );
  console.log("existingFavorite", isExistingFavorite);
  if (isExistingFavorite) {
    return res
      .status(409)
      .json({ isRegistered: false, message: "movieID already exists" });
  }

  // Save the new user in the users array
  favorites[userIndex].favoriteList.push(req.body.movieId);
  // Write the updated users array to the JSON file
  fs.writeFile(userFilePath, JSON.stringify(favorites), (err) => {
    if (err) {
      console.error("Error saving user data to file:", err.message);
      return res
        .status(500)
        .json({ isRegistered: false, error: "Error saving user data" });
    } else {
      console.log("favorite data saved to user.json successfully.");
      console.log("after " + JSON.stringify(favorites));
      // Registration successful
      return res.json({
        favorites: favorites[userIndex].favoriteList,
        message: "Successful saved",
      });
    }
  });
});

module.exports = router;
