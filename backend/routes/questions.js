const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const storagePath = path.join(__dirname, "../data");
const questionFilePath = path.join(storagePath, "questions.json");

// Get List of Questions
router.get("/questions", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  res.json(questions);
});

// Get Question Details
router.get("/questions/:questionId", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  const questionId = req.params.questionId;

  const question = questions.find((q) => q.id === parseInt(questionId));
  if (!question) {
    return res.status(404).json({ message: "Question not found." });
  }

  res.json(question);
});

// Write Your Questions
router.post("/questions", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  const { title, content, nickname } = req.body;

  const newQuestion = {
    id: questions.length + 1, // Simple auto-increment logic. Adjust as per your needs.
    title,
    content,
    nickname // This is just for the sake of the example. You might want to get the nickname from the session or body.
  };

  questions.push(newQuestion);
  fs.writeFileSync(questionFilePath, JSON.stringify(questions));

  res.json({ message: "Question added successfully.", ...newQuestion });
});

// Edit Question
router.post("/questions/:questionId", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  const { title, content } = req.body;
  const questionId = req.params.questionId;

  const index = questions.findIndex((q) => q.id === parseInt(questionId));
  if (index === -1) {
    return res.status(404).json({ message: "Question not found." });
  }

  questions[index].title = title;
  questions[index].content = content;

  fs.writeFileSync(questionFilePath, JSON.stringify(questions));
  res.json({ message: "Question updated successfully.", ...questions[index] });
});

// Add Answer (Only accessible by admin with specific userID)
router.post("/questions/:questionId/:userID", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  const { answer } = req.body; // answer 속성

  const questionId = req.params.questionId;
  const userID = req.params.userID; // 관리자의 userID

  // 관리자인지 여부를 확인하는 로직 (예시로 "admin123"이 관리자의 userID라고 가정)
  if (userID !== "admin123") {
    return res.status(403).json({ message: "Access denied. Only admin can add answer." });
  }

  const index = questions.findIndex((q) => q.id === parseInt(questionId));
  if (index === -1) {
    return res.status(404).json({ message: "Question not found." });
  }

  // 관리자만 answer 속성을 추가할 수 있도록 처리
  questions[index].answer = answer;

  fs.writeFileSync(questionFilePath, JSON.stringify(questions));
  res.json({ message: "Answer added successfully.", ...questions[index] });
});


// Delete Question
router.delete("/questions/:questionId", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionFilePath, "utf8"));
  const questionId = req.params.questionId;

  const newQuestions = questions.filter((q) => q.id !== parseInt(questionId));
  fs.writeFileSync(questionFilePath, JSON.stringify(newQuestions));

  res.json({ message: "Question deleted successfully." });
});





module.exports = router;
