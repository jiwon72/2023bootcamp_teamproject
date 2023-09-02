const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getConnection=require("../data/DBpool");
const { default: axios } = require("axios");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "favorite.json");

//영화 ID목록를 통해 영화 정보들을 가져오는 함수
const getMovieDetails = async (movieIds) => {
  const movieDetails = [];
  for (let id of movieIds) {
    try {
      const response = await axios.get(`http://localhost:3000/movies/${id}`);
      movieDetails.push(response.data);
    } catch (error) {
      console.error(`Error fetching details for movie ID ${id}:`, error.message);
    }
  }
  return movieDetails
}

// Get favorite route
router.get("/", async (req, res) => {
  const userSession = req.session.user;
  if (!userSession) {
    return res.status(401).json({ message: "Session expired. Please login." });
  }
  const userId=userSession.userID
  
  try {
    await getConnection(async (conn) => {
      //DB에서 해당 유저의 즐겨찾기 목록을 가져옴
      const Findquery = "SELECT * FROM MoviesMark WHERE user_user_id = ?";
      const userID = [userId];

      conn.query(Findquery, userID, async (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("An error occurred");
          conn.release();
          return;
        } else {
          //DB에서 가져온 영화ID 목록을 movieIdLst에 저장
          const movieIdLst = result.map((movie) => movie.Movie_Movie_ID);
          conn.release();
          
          // 영화 세부 정보 가져오기
          const movieDetails = await getMovieDetails(movieIdLst);
          res.status(200).json({favorites : movieDetails});
        }
      });
    });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("An error occurred");
  }


});
module.exports = router;
