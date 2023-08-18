const express = require("express");
const axios = require("axios");
const router = express.Router();

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

router.get("/popular", async (req, res) => {
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

router.get("/popular?genreId=:genreId", async (req, res) => {
  const genreID = req.query.genreId; // Get the genre ID from the route parameter

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?with_genres=${genreID}&language=ko-KR&page=1`,
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
    res.status(500).send("Error fetching movies for the given genre");
  }
});

router.get("popular?ottname=:ottname", async (req, res) => {
  const ottName = req.query.ottname;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?with_watch_providers=${ottName}&language=ko-KR&page=1`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results.slice(0, 10);
    console.log(movies);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies by OTT");
  }
});

router.get("/test", async (req, res) => {
  const ottName = req.query.ottname;
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/watch/providers/movie?language=ko-KR&watch_region=KR",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    let ottList = [];
    const response = await axios.request(options);
    const responseData = response.data.results;
    if (Array.isArray(responseData)) {
      responseData.forEach((item) => {
        if (item.display_priorities) {
          delete item.display_priorities;
        }
      });
    }
    responseData.forEach((item) => {
      if (item.provider_name) {
        ottList.push(item.provider_name);
      }
    });
    console.log(ottList);
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies by OTT");
  }
});

module.exports = router;
