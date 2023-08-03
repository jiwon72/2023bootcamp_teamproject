// Import required modules
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create the Express app
const app = express();

// Middleware
app.use(cookieParser("Secret"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors 방지
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, // Allow credentials (cookies, headers, etc.) to be sent with requests
};
app.use(cors(corsOptions));

//세션 관련 미들웨어 설정
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS in production
  })
);

// 로그인 api 함수 등록
const loginRouter = require("./DongUk/routes/login");
const logoutRouter = require("./DongUk/routes/logout");
const registerRouter = require("./DongUk/routes/register");
const searchRouter = require("./DongUk/routes/search"); // Import the search router

app.use("/auth/logout", logoutRouter);
app.use("/auth/login", loginRouter);
app.use("/auth/register", registerRouter); // Add the register route
app.use("/search", searchRouter); // Register the search route

app.get("/", (req, res) => {
  if (req.session.num === undefined)
    // 세션이 없다면
    req.session.num = 1; // 세션 등록
  else req.session.num += 1;

  res.send(`${req.session.num}번 접속`);
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//session test용 api
// Some protected route that requires the user to be logged in
app.get("/protected-route", (req, res) => {
  res.send(req.session);
});
