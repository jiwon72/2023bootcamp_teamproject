// 네이버 검색 API 예제 - 블로그 검색
var express = require("express");
var app = express();
var client_id = "nBGZBL0HSDgES0LSJbC0";
var client_secret = "Mm1f44do13";
app.get("/search/movie", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/movie.xml?query=" +
    encodeURI(req.query.query); // JSON 결과
  console.log(api_url);
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!"
  );
});
