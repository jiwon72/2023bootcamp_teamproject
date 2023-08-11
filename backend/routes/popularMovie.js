const express = require("express");
const axios = require("axios");
const router = express.Router();

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

router.get("/popular", async (req, res) => {
  console.log(TMDB_ACCESS_TOKEN);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results.slice(0, 10);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching latest movies");
  }
});

module.exports = router;
