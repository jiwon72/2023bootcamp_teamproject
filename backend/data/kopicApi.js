const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.kofic_api;

async function getDistributer(movieName) {
  let returnDistributor = "";
  //url encoding
  const movieListUrl = encodeURI(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${API_KEY}&movieNm=${movieName}`
  );
  await axios
    .get(movieListUrl)
    .then(async (response) => {
      const movieList = response.data.movieListResult.movieList;

      // 예시로 첫 번째 영화의 세부 정보를 가져옵니다.
      const movieCode = movieList[0].movieCd;
      const movieDetailUrl = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${API_KEY}&movieCd=${movieCode}`;

      await axios
        .get(movieDetailUrl)
        .then((response) => {
          const movieDetail = response.data.movieInfoResult.movieInfo;
          const distributor = movieDetail.companys.find(
            (company) => company.companyPartNm === "배급사"
          );
          console.log("Company", distributor);

          if (distributor) {
            console.log("배급사 정보:", distributor.companyNm);
            returnDistributor = distributor.companyNm;
          } else {
            console.log("해당 영화의 배급사 정보를 찾을 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error(
            "영화 세부 정보를 가져오는 중 오류가 발생했습니다:",
            error
          );
        });
    })
    .catch((error) => {
      console.error("영화 목록을 가져오는 중 오류가 발생했습니다:", error);
    });
  return returnDistributor;
}
// getDistributer("광해");
module.exports = getDistributer;
