// routes/logout.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "user.json");
// 유저 목록 불러오는 함수
const readUsers = () => {
  try {
    const usersJson = fs.readFileSync(userFilePath, "utf8");
    console.log("before" + JSON.parse(usersJson));
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error reading users from file:", error.message);
    return [];
  }
};

// Logout route
router.get("/", (req, res) => {
  //session에 user가 있는지 확인
  const sessionUser = req.session.user;
  console.log(JSON.stringify(sessionUser));
  // 유저 목록 불러오기
  const users = readUsers();
  if (sessionUser) {
    //users.json(유저목록)에서 user가 있는지 확인
    const user = users.find((user) => user.userID === sessionUser.userID);
    return res.json({ isDark: user.isDark });
  } else {
    //session에 user가 없다면 로그아웃 된 상태
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "session expired login again" });
  }
});

module.exports = router;
