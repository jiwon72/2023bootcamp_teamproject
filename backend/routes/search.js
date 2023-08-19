// routes/search.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const ExcelJS = require("exceljs");
const { getOttList } = require("../helpers/ottListHelper");

require("dotenv").config();

const LANGUAGE = "ko-KR";
TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
//EXCELJS의 문제로 인해 절대 경로로만 OTT정보 엑셀파일 경로 지정
PATH =
  "D:\\workspace\\2023BOOTCAMP_TEAMPROJECT\\backend\\DongUk\\movie_info\\movies.xlsx";

router.get("/movie", async function (req, res) {
  getOttList();
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
    const combinedResults = await Promise.all(
      details.map(async (detail, index) => {
        // console.log("detail", detail.data);
        kortitle = detail.data.title;
        engtitle = detail.data.original_title;
        const ottList = await getOttList(engtitle, kortitle);
        console.log("ottList", ottList);
        return {
          ...detail.data,
          ottList,
        };
      })
    );

    res.status(200).json(combinedResults);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).end();
    console.log("error =", error.response ? error.response.status : error);
  }
});

module.exports = router;
