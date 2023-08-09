const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const storagePath = path.join(__dirname, "../data");
const reviewFilePath = path.join(storagePath, "review.json");

// Edit Review
router.post("/reviews/:reviewId", (req, res) => {
  const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
  if (!req.session.user) {
    return res.status(401).json({ message: "Session expired. Please login." });
  }
  const userID = req.session.user.userID;
  const { content, rating } = req.body;
  const reviewId = req.params.reviewId;

  const index = reviews.findIndex((review) => review.id === parseInt(reviewId));
  if (index === -1) {
    return res.status(404).json({ message: "Review not found." });
  }

  reviews[index].content = content;
  reviews[index].rating = rating;

  fs.writeFileSync(reviewFilePath, JSON.stringify(reviews));
  res.json({ message: "Review updated successfully." });
});

// Delete Review
router.delete("/reviews/:reviewId", (req, res) => {
  const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
  const reviewId = req.params.reviewId;

  const newReviews = reviews.filter(
    (review) => review.id !== parseInt(reviewId)
  );
  fs.writeFileSync(reviewFilePath, JSON.stringify(newReviews));

  res.json({ message: "Review deleted successfully." });
});

// Lookup Reviews
router.get("/movies/:movieId/reviews", (req, res) => {
  const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
  const movieId = req.params.movieId;

  const filteredReviews = reviews.filter(
    (review) => review.movieId === parseInt(movieId)
  );
  res.json({ reviews: filteredReviews });
});

// Write Review
router.post("/movies/:movieId/reviews", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Session expired. Please login." });
  }
  const reviews = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
  const { rating, content, isSpoil } = req.body;
  const createDate = new Date().toISOString().slice(0, 10);

  const newReview = {
    id: reviews.length + 1, // Simple auto-increment logic. Adjust as per your needs.
    userID: req.session.user.userID,
    movieId: parseInt(req.params.movieId),
    rating,
    content,
    isSpoil,
    createDate,
  };

  reviews.push(newReview);
  fs.writeFileSync(reviewFilePath, JSON.stringify(reviews));

  res.json({ message: "Review added successfully." });
});

module.exports = router;
