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

//  api 함수 등록
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const registerRouter = require("./routes/register");
const searchRouter = require("./routes/search"); // Import the search router
const nowMoviesRouter = require("./routes/nowPlayMovie"); // movies.js 파일에서 라우터 가져오기
const popularMoviesRouter = require("./routes/popularMovie"); // popularMovie.js 파일에서 라우터 가져오기
const isDarkRouter = require("./routes/isDark"); // isDark.js 파일에서 라우터 가져오기
const setDarkRouter = require("./routes/setDark"); // isDark.js 파일에서 라우터 가져오기
const detailMovieRouter = require("./routes/detailMovie"); // detailMovie.js 파일에서 라우터 가져오기
const favoritesRouter = require("./routes/addfavorites"); // favorites.js 파일에서 라우터 가져오기
const removeFavoritesRouter = require("./routes/removefavorites"); // favorites.js 파일에서 라우터 가져오기
const showFavoritesRouter = require("./routes/showfavorites"); // favorites.js 파일에서 라우터 가져오기
const reviewRouter = require("./routes/review"); // review.js 파일에서 라우터 가져오기
const QnARouter = require("./routes/questions"); // QnA.js 파일에서 라우터 가져오기
const personalRoute = require("./routes/personal"); // 회원정보 받아오기
const personalChangeRoute = require("./routes/personalChange"); // 회원정보 수정하기

//회원가입 로그인 로그아웃 관련 api
app.use("/auth/logout", logoutRouter);
app.use("/auth/login", loginRouter);
app.use("/auth/register", registerRouter); // Add the register route
//영화 관련 api
app.use("/search", searchRouter); // Register the search route
app.use("/movies", nowMoviesRouter); // '/movies/latest' 경로에 라우터 적용
app.use("/movies", popularMoviesRouter); // '/movies/popluar' 경로에 라우터 적용
app.use("/movies", detailMovieRouter); // '/movies/:movieID' 경로에 라우터 적용
//다크모드 관련 api
app.use("/users/isDark", isDarkRouter); // '/routes/isDark' 경로에 라우터 적용
app.use("/users/setDark", setDarkRouter); // '/routes/setDark' 경로에 라우터 적용
//즐겨찾기 관련 api
app.use("/users/addfavorites", favoritesRouter); // '/routes/favorites' 경로에 라우터 적용
app.use("/users/removefavorites", removeFavoritesRouter); // '/routes/removefavorites' 경로에 라우터 적용
app.use("/users/favorites", showFavoritesRouter); // '/routes/showfavorites' 경로에 라우터 적용
//리뷰 관련 api
app.use("/", reviewRouter); // '/routes/review' 경로에 라우터 적용
//QnA 관련 api
app.use("/", QnARouter); // '/routes/question' 경로에 라우터 적용
// '/routes/personal' 경로에 라우터 적용 -> 회원정보 불러오기
app.use("/users", personalRoute);
app.use("/users", personalChangeRoute);

app.get("/", (req, res) => {
  if (req.session.num === undefined)
    // 세션이 없다면
    req.session.num = 1; // 세션 등록
  else req.session.num += 1;
  res.send(JSON.stringify(req.session));
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
