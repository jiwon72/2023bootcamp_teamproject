const express = require("express");
const router = express.Router();

const getConnection = require("../data/DBpool.js");

// Define the route for getting user profiles
router.get("/profile", (req, res) => {
  const userSession = req.session.user;
  console.log(req.session);

  // 로그인 상태 확인
  if (!userSession) {
    return res.status(401).json({
      isSuccess: false,
      message: "Session expired. Please log in.",
    });
  }

  const userId = userSession.userID;

  getConnection(function (conn) {
    const selectQuery = "SELECT NickName, user_Password FROM user WHERE user_ID = ?";

    conn.query(selectQuery, [userId], (error, results) => {
      conn.release(); // 연결 해제

      if (error) {
        console.error("Error querying the database:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        console.log(`User not found for userId: ${userId}`);
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];
      const { NickName, user_Password } = user;
      console.log(`Found user:`, user);
      res.json({ NickName, user_Password });
    });
  });
});

module.exports = router;
