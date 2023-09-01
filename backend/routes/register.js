const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getConnection = require("../data/DBpool.js");

const storagePath = path.join(__dirname, "../data");
const userFilePath = path.join(storagePath, "user.json");

// 아이디 중복 확인용 api
router.post("/check", (req, res) => {
  const { userID } = req.body;
  const query = "SELECT * FROM user WHERE user_ID = ?";
  const values = [userID];
  const db = getConnection((conn) =>
    conn.query(query, values, (err, result) => {
      conn.release();

      if (err) {
        console.log(err);
        res.status(500).send("An error occurred");
        return;
      }
      if (result.length === 0) {
        res.status(200).json({ message: "User not found", isDuplicate: false });
      } else {
        res
          .status(409)
          .json({ message: "Same userID exists", isDuplicate: true });
      }
    })
  );
});
// nickname 중복 확인용 api
router.post("/checknick", (req, res) => {
  const { nickname } = req.body;
  const query = "SELECT * FROM user WHERE NickName = ?";
  const values = [nickname];
  const db = getConnection((conn) =>
    conn.query(query, values, (err, result) => {
      conn.release();

      if (err) {
        console.log(err);
        res.status(500).send("An error occurred");
        return;
      }
      if (result.length === 0) {
        res.status(200).json({ message: "User not found", isDuplicate: false });
      } else {
        res
          .status(409)
          .json({ message: "Same nickname exists", isDuplicate: true });
      }
    })
  );
});

// Registration route
router.post("/", (req, res) => {
  const {
    username,
    password,
    nickname,
    birthdate,
    userID,
    likeOTTs,
    likeGenres,
  } = req.body;

  // // Read existing users from the JSON file
  // const users = readUsers();
  // console.log("newusers", users);
  // // Check if the userID already exists in the users array
  // const existingUser = users.find((user) => user.userID === userID);
  // if (existingUser) {
  //   return res
  //     .status(409)
  //     .json({ isRegistered: false, error: "UserID already exists" });
  // }

  // // Save the new user in the users array
  // const newUser = {
  //   username,
  //   password,
  //   nickname,
  //   userID,
  //   likeOTTs,
  //   likeGenres,
  //   birthdate,
  // };
  // users.push(newUser);

  // // Write the updated users array to the JSON file
  // fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
  //   if (err) {
  //     console.error("Error saving user data to file:", err.message);
  //     return res
  //       .status(500)
  //       .json({ isRegistered: false, error: "Error saving user data" });
  //   } else {
  //     console.log("User data saved to user.json successfully.");
  //     console.log("after " + JSON.stringify(users));
  //     // Registration successful
  //     return res.json({
  //       isRegistered: true,
  //       message: "Successful registration",
  //     });
  //   }
  // });

  //use DataBase
  const query =
    "INSERT INTO user (user_Name, user_Password, NickName, birthday, user_ID) VALUES (?, ?, ?, ?, ?)";
  const values = [username, password, nickname, birthdate, userID];
  const db = getConnection((conn) =>
    conn.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          messsage: "An error occurred",
          error: err,
          isRegistered: false,
        });
        return;
      }
      res.status(200).json({ message: "User registered", isRegistered: true });
    })
  );
});

module.exports = router;
