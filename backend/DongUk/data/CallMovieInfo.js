// Import the required library
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");

// Example GET request
axios
  .get(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.apiKey}&openStartDt=2021&itemPerPage=100`
  )
  .then((response) => {
    // Handle the API response data
    fs.writeFile("movies.json", JSON.stringify(response.data), (err) => {
      if (err) {
        console.error("Error saving movie data to file:", err.message);
      } else {
        console.log("Movie data saved to movies.json successfully.");
      }
    });
    console.log(response.data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the API call
    console.error("Error making API call:", error.message);
  });
