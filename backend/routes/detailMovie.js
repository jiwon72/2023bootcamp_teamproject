const express = require("express");
const axios = require("axios");
const router = express.Router();
const getCastHelper = require("../helpers/getCastHelper");
const ottListHelper = require("../helpers/ottListHelper");
const getDistributer = require("../data/kopicApi");

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
//배우 정보를 불러오는 함수

router.get("/:movieID", async (req, res) => {
  const movieID = req.params.movieID;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(options);
    let movie = response.data;
    //영화 감독 배우정보를 불러온다.
    const casts = await getCastHelper.getCasts(movieID);
    movie.actors = casts.Actors;
    movie.director = casts.Director;
    //영화의 OTT 정보를 불러온다.
    const ottList = await ottListHelper.getOttList(
      movie.title,
      movie.original_title
    );
    //영화의 배급사 정보를 불러온다.
    console.log("movie", movie.title);
    const distributor = await getDistributer(movie.title);
    console.log("distributor", distributor);
    movie.ottList = ottList;
    movie.distributor = distributor;
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching latest movies");
  }
});

module.exports = router;
