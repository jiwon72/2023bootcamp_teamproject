const mysql = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a connection pool
const pool = mysql.createPool(config);

// Get a connection from the pool
pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }

  console.log("Connected to the database!");

  // Release the connection back to the pool
  conn.release();
  console.log("Connection released.");
});
