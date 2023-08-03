// routes/search.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const LANGUAGE = "ko-KR";
TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
TMDB_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDkyM2UyOWIxOTZmZWMwYjIzYmZlYjgzOGI4OGI0YSIsInN1YiI6IjY0Y2I0Nzc1NDNjZDU0MDBhZGQ1OGQ5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AgdF46090Q1qDIZE2ZGZ1ngQ0eRloYDsOxpwuXD3vdU";

router.get("/movie", async function (req, res) {
  const query = req.query.query;
  const page = req.query.page || 1;
  console.log(TMDB_ACCESS_TOKEN);

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const searchOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
        query
      )}&include_adult=false&language=${LANGUAGE}&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    };

    const searchResponse = await axios.request(searchOptions);
    const movieIds = searchResponse.data.results.map((movie) => movie.id);

    const detailsPromises = movieIds.map((id) => {
      const detailOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}?language=${LANGUAGE}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      };
      return axios.request(detailOptions);
    });

    const details = await Promise.all(detailsPromises);

    // 중복되는 정보를 제거하고 세부 정보만 포함
    const combinedResults = details.map((detail, index) => {
      return detail.data; // 세부 정보만 반환
    });

    res.status(200).json(combinedResults);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).end();
    console.error("Error Response:", error.response.data);
    console.log("error =", error.response ? error.response.status : error);
  }
});

module.exports = router;
