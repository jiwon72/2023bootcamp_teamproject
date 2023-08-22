const express = require("express");
const axios = require("axios");
const router = express.Router();

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

router.get("/latest", async (req, res) => {
  const page = req.query.page || 1;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results;
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching latest movies");
  }
});

module.exports = router;
