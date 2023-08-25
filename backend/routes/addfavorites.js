const express = require("express");
const router = express.Router();
const getConnection = require("../data/DBpool.js");

router.post("/", (req, res) => {
  const userSession = req.session.user;

  // 로그인 상태 확인
  if (!userSession) {
    return res.status(401).json({
      isSuccess: false,
      message: "Session expired. Please log in.",
    });
  }

  // 요청으로부터 전달된 데이터 가져오기
  const movieId = req.body.movieId;
  const userId = userSession.userID;

  // DB 연결
  getConnection((conn) => {
    // 해당 영화가 이미 즐겨찾기에 추가되어 있는지 확인하는 쿼리
    const checkQuery = "SELECT * FROM MoviesMark WHERE Movie_Movie_ID = ? AND user_user_id = ?";
    const checkValues = [movieId, userId];

    conn.query(checkQuery, checkValues, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred");
        conn.release();
        return;
      }

      if (result.length > 0) {
        // 이미 즐겨찾기에 추가된 영화인 경우
        res.status(409).json({
          isSuccess: false,
          message: "Movie ID already exists in favorites.",
        });
        conn.release();
      } else {
        // 영화를 즐겨찾기에 추가하는 쿼리
        const addQuery = "INSERT INTO MoviesMark (Movie_Movie_ID, user_user_id, CreateDate) VALUES (?, ?, NOW())";
        const addValues = [movieId, userId];

        conn.query(addQuery, addValues, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("An error occurred while adding to favorites.");
            conn.release();
            return;
          }

          res.status(200).json({
            isSuccess: true,
            message: "Movie added to favorites successfully.",
          });
          conn.release();
        });
      }
    });
  });
});

module.exports = router;
