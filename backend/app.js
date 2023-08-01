// Import required modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//세션 관련 미들웨어 설정
app.use(session({
  secret: 'Secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS in production
}));


//허가 host 주소
const allowedOrigins = ['https://moviefinder.run.goorm.site:3000'];

//cors 방지
app.use(cors({
  origin: '*',
}));




// 로그인 api 함수 등록
const loginRouter = require('./DongUk/routes/login');
app.use('/api/login', loginRouter);


app.get('/',(req,res)=>{
    res.send("hello express");
    
})
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});