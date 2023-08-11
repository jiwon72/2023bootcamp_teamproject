const axios = require("axios");
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

async function getCasts(movieID) {
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
    const Actors = result.data.cast.map((cast) => {
      if (cast.known_for_department === "Acting") return cast.name;
    });

    const director = result.data.crew.filter((crew) => crew.job === "Director");
    console.log("director", director);

    return {
      Actors: Actors,
      Director: director[0].name,
    };
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  getCasts,
};
