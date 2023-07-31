// app.js 또는 다른 파일에 코드를 작성합니다.
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv'); // .env 파일을 읽기 위해 dotenv 패키지를 사용합니다.

const app = express();
dotenv.config(); // .env 파일을 읽어서 환경 변수로 설정합니다.

// MySQL 연결 정보 설정
const dbConfig = {
  host: process.env.DB_HOST, // 환경 변수를 사용하여 DB 정보를 불러옵니다.
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// MySQL과의 연결 생성
const connection = mysql.createConnection(dbConfig);

// MySQL 연결 테스트
connection.connect((err) => {
  if (err) { 
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Express 앱의 라우트 설정 등을 진행하면 됩니다.

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});