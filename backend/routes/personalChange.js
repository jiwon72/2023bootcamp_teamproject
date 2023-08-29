const express = require("express");
const router = express.Router();
const getConnection = require("../data/DBpool.js");

// Update user profile (nickname)
const updateUserProfile = (conn, userId, nickname, callback) => {
  const query = "UPDATE user SET NickName = ? WHERE user_ID = ?";
  conn.query(query, [nickname, userId], callback);
};

// Update user password
const updateUserPassword = (conn, userId, password, callback) => {
  const query = "UPDATE user SET user_Password = ? WHERE user_ID = ?";
  conn.query(query, [password, userId], callback);
};


// Disable foreign key checks
const disableForeignKeyChecks = (conn, callback) => {
  conn.query("SET FOREIGN_KEY_CHECKS = 0", (error) => {
    if (error) {
      console.error("Error disabling foreign key checks:", error);
      return callback(error);
    }
    callback(null);
  });
};

// Enable foreign key checks
const enableForeignKeyChecks = (conn, callback) => {
  conn.query("SET FOREIGN_KEY_CHECKS = 1", (error) => {
    if (error) {
      console.error("Error enabling foreign key checks:", error);
      return callback(error);
    }
    callback(null);
  });
};

router.post("/profile", (req, res) => {
  const userSession = req.session.user;
  const nickname = req.body.nickname;
  const password = req.body.password;

  console.log(req.body);

  if (!userSession) {
    return res.status(401).json({
      isSuccess: false,
      message: "Session expired. Please log in.",
    });
  }
  
  const userId = userSession.userID;

  getConnection((conn) => {
    conn.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ isUpdated: false, error: "Error starting transaction" });
      }

      disableForeignKeyChecks(conn, (disableError) => {
        if (disableError) {
          conn.rollback(() => {
            console.error("Error during transaction:", disableError);
            res.status(500).json({ isUpdated: false, error: "Error during transaction" });
          });
        } else {
          if (password) {
            updateUserPassword(conn, userId, password, (error1) => {
              if (error1) {
                conn.rollback(() => {
                  console.error("Error updating user password:", error1);
                  res.status(500).json({ isUpdated: false, error: "Error updating user password" });
                });
              } else {
                enableForeignKeyChecks(conn, (enableError) => {
                  if (enableError) {
                    conn.rollback(() => {
                      console.error("Error during transaction:", enableError);
                      res.status(500).json({ isUpdated: false, error: "Error during transaction" });
                    });
                  } else {
                    conn.commit((commitError) => {
                      if (commitError) {
                        conn.rollback(() => {
                          console.error("Error committing transaction:", commitError);
                          res.status(500).json({ isUpdated: false, error: "Error committing transaction" });
                        });
                      } else {
                        console.log("User password updated");
                        res.json({ isUpdated: true });
                      }
                    });
                  }
                });
              }
            });
          } else {
            updateUserProfile(conn, userId, nickname, (error2) => {
              if (error2) {
                conn.rollback(() => {
                  console.error("Error updating user profile:", error2);
                  res.status(500).json({ isUpdated: false, error: "Error updating user profile" });
                });
              } else {
                enableForeignKeyChecks(conn, (enableError) => {
                  if (enableError) {
                    conn.rollback(() => {
                      console.error("Error during transaction:", enableError);
                      res.status(500).json({ isUpdated: false, error: "Error during transaction" });
                    });
                  } else {
                    conn.commit((commitError) => {
                      if (commitError) {
                        conn.rollback(() => {
                          console.error("Error committing transaction:", commitError);
                          res.status(500).json({ isUpdated: false, error: "Error committing transaction" });
                        });
                      } else {
                        console.log("User profile updated");
                        res.json({ isUpdated: true });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    });
  });
});



module.exports = router;
