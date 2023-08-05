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
    console.log("userList" + JSON.parse(usersJson));
    return JSON.parse(usersJson);
  } catch (error) {
    console.error("Error reading users from file:", error.message);
    return [];
  }
};

// setDark route
router.post("/", (req, res) => {
  //session에 user가 있는지 확인
  const sessionUser = req.session.user;
  // 유저 목록 불러오기
  let users = readUsers();
  if (sessionUser) {
    //users.json(유저목록)에서 user가 있는지 확인

    const user = users.find((user) => user.userID === sessionUser.userID);
    if (user) {
      // Update the user's isDark property
      for (let i = 0; i < users.length; i++) {
        //users.json(유저목록)에서 user가 있는지 확인
        if (users[i].userID === sessionUser.userID) {
          console.log("userID" + users[i].userID);
          console.log("isDark" + users[i].isDark);
          users[i].isDark = req.body.isDark;
          console.log("users" + JSON.stringify(users));

          // Write the updated users array to the JSON file
          fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
            if (err) {
              console.error("Error saving user data to file:", err.message);
              return res.status(500).json({ error: "Error saving user data" });
            } else {
              console.log("user" + user + " " + "isDark" + user.isDark);
              // Return the updated user
              return res.json({
                isDark: user.isDark,
                message: "Darkmode data updated successfully",
              });
            }
          });
        }
      }
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } else {
    //session에 user가 없다면 로그아웃 된 상태
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "session expired login again" });
  }
});

module.exports = router;
