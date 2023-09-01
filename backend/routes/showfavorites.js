const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getConnection=require("../data/DBpool")

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
  const userId=userSession.userID
  
  // DB 연결
  getConnection((conn) => {
    // 해당 영화가 이미 즐겨찾기에 추가되어 있는지 확인하는 쿼리
    const Findquery = "SELECT * FROM MoviesMark WHERE user_user_id = ?";
    const userID = [userId];

    conn.query(Findquery, userID, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred");
        conn.release();
        return;
      }

    
    else {

      res.json({favorites : result})


    
      }
    });
  });
});
module.exports = router;
