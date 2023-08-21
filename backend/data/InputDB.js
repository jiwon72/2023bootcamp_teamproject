const fs = require("fs");
const getConnection = require("./DBpool.js");

function insertMovieData(conn, movie, totalMovies, processedMovies) {
  // Check if the movie has an English name, otherwise use the Korean name for the check
  const movieTitle = movie.movieNmEn ? movie.movieNmEn : movie.movieNm;

  // SQL query to check for an existing movie with the same title (using Korean name if no English name is provided)
  const selectSql =
    "SELECT COUNT(*) as count FROM Movie WHERE title = ? OR EngName = ?";

  // Execute the query to check for an existing movie
  conn.query(selectSql, [movieTitle, movieTitle], (err, results) => {
    if (err) {
      console.error("Error checking for existing movie:", err.message);
      return;
    }

    if (results[0].count > 0) {
      // Movie with the same title (or English name) already exists, skip inserting
      console.log(
        `Movie with title '${movieTitle}' already exists in the database. Skipping insertion.`
      );
    } else {
      // Movie does not exist, proceed with insertion
      const insertSql =
        "INSERT INTO Movie (Movie_ID, title, pubcountry, openDate, PubDate, Distributor, watchGradeNm, Summary, showTm, imgSrc, EngName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      conn.query(
        insertSql,
        [
          movie.movieCd,
          movie.movieNm,
          movie.nationAlt,
          movie.openDt,
          movie.prdtYear,
          movie.repnationNm,
          movie.watchGradeNm,
          "",
          movie.showTm,
          movie.imgSrc,
          movie.movieNmEn,
        ],
        (err, insertResults) => {
          if (err) {
            console.error("Error inserting movie data:", err.message);
          } else {
            console.log(`Movie data inserted for movie ${movieTitle}.`);
          }

          processedMovies++;

          // Check if all movies have been processed, then release the connection
          if (processedMovies === totalMovies) {
            conn.release();
            console.log("Data insertion complete. Connection released.");
          }
        }
      );
    }
  });
}

// Read the movie data from the JSON file
fs.readFile("movies.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading movies.json:", err.message);
    return;
  }

  try {
    const movieData = JSON.parse(data);
    const movieList = movieData.movieListResult.movieList;
    const totalMovies = movieList.length;
    let processedMovies = 0;
    console.log(`Total movies: ${totalMovies}`);

    // Get a connection from the pool and insert movie data for each movie in the movieList
    getConnection((conn) => {
      console.log("Connected to the database.");

      for (const movie of movieList) {
        insertMovieData(conn, movie, totalMovies, processedMovies);
      }
    });
  } catch (error) {
    console.error("Error parsing movies.json:", error.message);
  }
});
