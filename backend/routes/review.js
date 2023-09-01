const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const storagePath = path.join(__dirname, "../data");
const reviewFilePath = path.join(storagePath, "review.json");
const getConnection = require("../data/DBpool.js");

// Edit Review
// router.post("/reviews/:reviewId", (req, res) => {
//   const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
//   if (!req.session.user) {
//     return res.status(401).json({ message: "Session expired. Please login." });
//   }
//   const userID = req.session.user.userID;
//   const { content, rating } = req.body;
//   const reviewId = req.params.reviewID;

//   const index = reviews.findIndex((review) => review.id === parseInt(reviewId));
//   if (index === -1) {
//     return res.status(404).json({ message: "Review not found." });
//   }

//   reviews[index].content = content;
//   reviews[index].rating = rating;

//   fs.writeFileSync(reviewFilePath, JSON.stringify(reviews));
//   res.json({ message: "Review updated successfully.", isEdit: true });
// });

// Edit Review from DB
router.post("/reviews/:reviewId", (req, res) => {
  console.log(req.session)
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Session expired. Please login.", isEdit: false });
  }
  const { content, rating } = req.body;
  const reviewId = req.params.reviewId;

  const query = "UPDATE Review SET content = ?, rating = ? WHERE ReviewID = ?";
  const values = [content, rating, reviewId];

  getConnection((conn, err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred", isEdit: false });
    }
    conn.query(query, values, (err, result) => {
      conn.release();
      console.log("rows",result.affectedRows)
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Review not found.", isEdit: false });
      }
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "An error occurred", isEdit: false });
      }
      res.json({ message: "Review updated successfully.", isEdit: true });
    });
  });
});

// Delete Review
// router.delete("/reviews/:reviewId", (req, res) => {
//   const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
//   const reviewId = req.params.reviewId;

//   const newReviews = reviews.filter(
//     (review) => review.id !== parseInt(reviewId)
//   );
//   fs.writeFileSync(reviewFilePath, JSON.stringify(newReviews));

//   res.json({ message: "Review deleted successfully.", isDelete: true });
// });

// Delete Review from DB
router.delete("/reviews/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;

  const query = "DELETE FROM Review WHERE ReviewID = ?";
  getConnection((conn, err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred");
    }
    conn.query(query, [reviewId], (err, result) => {
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No review found with the given ID",
          isDelete: false,
        });
      }

      conn.release();
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "An error occurred", isDelete: false });
      }
      return res.json({
        message: "Review deleted successfully.",
        isDelete: true,
      });
    });
  });
});

// Lookup Reviews
// router.get("/movies/:movieId/reviews", (req, res) => {
//   const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
//   const movieId = req.params.movieId;

//   const filteredReviews = reviews.filter(
//     (review) => review.movieId === parseInt(movieId)
//   );
//   res.json({ reviews: filteredReviews });
// });

//lookup reviews from DB
router.get("/movies/:movieId/reviews", async (req, res) => {
  const movieId = req.params.movieId;

  const query = "SELECT * FROM Review WHERE Movie_Movie_ID = ?";
  getConnection(async (conn, err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred " });
    }
    conn.query(query, [movieId], async (err, results) => {
      if (err) {
        console.log(err.message);
        return res
          .status(500)
          .json({ message: "An error occurred during query execution" });
      }

      const getNickname = (userID) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT NickName FROM user WHERE user_ID = ?";
          conn.query(query, [userID], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows[0].NickName);
            }
          });
        });
      };

      for (let i = 0; i < results.length; i++) {
        try {
          results[i].nickname = await getNickname(results[i].user_userID);
        } catch (error) {
          console.log(error);
          conn.release();
          return res.status(500).json({ message: "An error occurred" });
        }
      }
      conn.release();
      res.json({ reviews: results });
    });
  });
});

// // Write Review
// router.post("/movies/:movieId/reviews", (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: "Session expired. Please login." });
//   }
//   const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
//   const { rating, content, isSpoil } = req.body;
//   const createDate = new Date().toISOString().slice(0, 10);

//   const newReview = {
//     id: reviews.length + 1, // Simple auto-increment logic. Adjust as per your needs.
//     userID: req.session.user.userID,
//     movieId: parseInt(req.params.movieId),
//     rating,
//     content,
//     isSpoil,
//     createDate,
//   };

//   reviews.push(newReview);
//   fs.writeFileSync(reviewFilePath, JSON.stringify(reviews));

//   res.json({ message: "Review added successfully." });
// });
// Write Review from DB
router.post("/movies/:movieId/reviews", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Session expired. Please login." });
  }
  const { rating, content, isSpoil } = req.body;
  const createDate = new Date().toISOString().slice(0, 10);

  const query =
    "INSERT INTO Review (user_userID, Movie_Movie_ID, rating, content, isSpoil, createDate) VALUES (?, ?, ?, ?, ?, NOW())";
  const values = [
    req.session.user.userID,
    req.params.movieId,
    rating,
    content,
    isSpoil,
    createDate,
  ];

  const db = getConnection((conn, err) => {
    if (err) {
      console.error("Database connection error:", err);
      return res
        .status(500)
        .json({ message: "An error occurred", isWrite: false });
    }
    conn.query(query, values, (err) => {
      conn.release();
      if (err) {
        console.log(err.message);
        return res
          .status(500)
          .json({ message: "An error occurred", isWrite: false });
      }
      res.json({ message: "Review added successfully.", isWrite: true });
    });
  });
});

//새 API추가
router.get("/reviews/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  console.log("ReviewID:", reviewId); // 리뷰 ID가 정확하게 가져와지는지 확인
  const query = "SELECT * FROM Review WHERE ReviewID = ?";
  getConnection(async (conn, err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "오류가 발생했습니다." });
    }
    conn.query(query, [reviewId], async (err, results) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: "쿼리 실행 중 오류가 발생했습니다." });
      }

      const getNickname = (userID) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT NickName FROM user WHERE user_ID = ?";
          conn.query(query, [userID], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows[0].NickName);
            }
          });
        });
      };

      for (let i = 0; i < results.length; i++) {
        try {
          results[i].nickname = await getNickname(results[i].user_userID);
        } catch (error) {
          console.log(error);
          conn.release();
          return res.status(500).json({ message: "오류가 발생했습니다." });
        }
      }
      conn.release();
      res.json({ reviews: results });
    });
  });
});

module.exports = router;
