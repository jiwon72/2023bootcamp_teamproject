const express = require("express");
const axios = require("axios");
const router = express.Router();

TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
//배우 정보를 불러오는 함수
async function getActors(movieID) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieID}/credits?language=ko-KR`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };
  try {
    const result = await axios.request(options);
    const Actors = result.data.cast.map((actor) => {
      if (actor.known_for_department === "Acting") return actor.name;
    });
    console.log(Actors);
    return Actors;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching ActorInfo");
  }
}

router.get("/:movieID", async (req, res) => {
  const movieID = req.params.movieID;
  getActors(movieID);
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
    const movie = response.data;
    movie.actors = await getActors(movieID);
    console.log("movie", movie);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching latest movies");
  }
});

module.exports = router;
