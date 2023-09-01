const express = require("express");
const axios = require("axios");
const router = express.Router();

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

router.get("/popular", async (req, res) => {
  const page = req.query.page || 1;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
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

router.get("/popular/genre", async (req, res) => {
  const genreID = req.query.genreId; // Get the genre ID from the route parameter
  const page = req.query.page || 1;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?with_genres=${genreID}&language=ko-KR&page=${page}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results;
    console.log("moviesLength", movies.length);
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching movies for the given genre");
  }
});

router.get("/popular/ott", async (req, res) => {
  const ottId = req.query.ottId;
  if (ottId === null || ottId === undefined) {
    res.status(404).json({ message: "ottId is null or undefined" });
  }
  const page = req.query.page || 1;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?with_watch_providers=${ottId}&sort_by=popularity.desc&language=ko-KR&page=${page}&watch_region=KR`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results; // Fetch OTT provider details for each movie and add to the result

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movies by OTT" });
  }
});

module.exports = router;
