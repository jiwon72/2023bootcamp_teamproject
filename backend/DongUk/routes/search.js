// routes/search.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const LANGUAGE = "ko-KR"; // Korean language code
TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
// TMDB_ACCESS_TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDkyM2UyOWIxOTZmZWMwYjIzYmZlYjgzOGI4OGI0YSIsInN1YiI6IjY0Y2I0Nzc1NDNjZDU0MDBhZGQ1OGQ5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AgdF46090Q1qDIZE2ZGZ1ngQ0eRloYDsOxpwuXD3vdU";

router.get("/movie", async function (req, res) {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
      query
    )}&include_adult=false&language=${LANGUAGE}&page=1`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).end();
    console.error("Error Response:", error.response.data);
    console.log("error =", error.response ? error.response.status : error);
  }
});

module.exports = router;
