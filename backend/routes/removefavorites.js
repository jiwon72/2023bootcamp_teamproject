const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getConnection = require("../data/DBpool");
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

// Remove from favorite route
router.post("/", (req, res) => {
  const userSession = req.session.user;
  if (!userSession) {
    return res
      .status(401)
      .json({ isDeleted: false, message: "Session expired. Please login." });
  }

  // DB 연결
  getConnection((conn) => {
    const deleteQuery =
      "DELETE FROM MoviesMark WHERE Movie_Movie_ID = ? AND user_user_id = ?";
    const selectQuery =
      "SELECT Movie_Movie_ID FROM MoviesMark WHERE user_user_id = ?";

    const movieId = req.body.movieId;
    const userId = userSession.userID;
    const deleteValues = [movieId, userId];
    Myfavorite = [];
    conn.query(deleteQuery, deleteValues, async (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          messsage: "An error occurred",
          error: err,
          isDeleted: false,
        });
        return;
      }
      // 삭제 이후 남은 내 즐겨찾기 목록
      conn.query(selectQuery, userId, (err, selectresult) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            messsage: "An error occurred in Select Query",
            error: err,
            isDeleted: false,
          });
          conn.release();
          return;
        } else {
          console.log("selectresult", selectresult);
          selectresult.forEach((element) => {
            Myfavorite.push(element.Movie_Movie_ID);
          });
        }
        conn.release();
      });
      console.log("result", result);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ isDeleted: false, message: "Movie not found in favorites." });
      }
      res.json({
        isDeleted: true,
        message: "Successfully removed from favorites.",
        favorites: Myfavorite,
      });
      console.log("favorite data removed from user.json successfully.");

      conn.release();
    });
  });

  // // Read existing favorites from the JSON file
  // let favorites = readFavorites();

  // let userIndex = null;
  // for (let i = 0; i < favorites.length; i++) {
  //   if (favorites[i].userId === userSession.userID) {
  //     userIndex = i;
  //   }
  // }

  // // If user doesn't exist in the favorites, return error
  // if (userIndex === null) {
  //   return res
  //     .status(404)
  //     .json({ isDeleted: false, message: "User not found in favorites." });
  // }
  // console.log("findUser", favorites[userIndex]);
  // console.log("req.body.movieId", req.body.movieId);
  // const favoriteIndex = favorites[userIndex].favoriteList.findIndex(
  //   (favorite) => {
  //     console.log("favorite", favorite);
  //     return favorite == req.body.movieId;
  //   }
  // );
  // console.log("favoriteIndex", favoriteIndex);
  // // If the movie is not in the favorite list, return error
  // if (favoriteIndex === -1) {
  //   return res
  //     .status(404)
  //     .json({ isDeleted: false, message: "Movie not found in favorites." });
  // }

  // // Remove the movie from the favorite list
  // favorites[userIndex].favoriteList.splice(favoriteIndex, 1);

  // // Write the updated favorites array to the JSON file
  // fs.writeFile(userFilePath, JSON.stringify(favorites), (err) => {
  //   if (err) {
  //     console.error("Error saving user data to file:", err.message);
  //     return res
  //       .status(500)
  //       .json({ isDeleted: false, error: "Error saving user data" });
  //   } else {
  //     console.log("favorite data removed from user.json successfully.");
  //     return res.json({
  //       favorites: favorites[userIndex].favoriteList,
  //       message: "Successfully removed from favorites.",
  //     });
  //   }
  // });
});

module.exports = router;
