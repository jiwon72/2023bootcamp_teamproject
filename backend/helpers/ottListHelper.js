const ExcelJS = require("exceljs");
const axios = require("axios");
require("dotenv");

//EXCELJS의 문제로 인해 절대 경로만 사용 가능
const PATH =
  "C:\\Users\\smlab\\workspace\\project_combine\\backend\\movie_info\\movieOTT.xlsx";

async function getOttList(englishTitle, korTitle) {
  console.log(
    `Searching for OTT list for movie title: ${englishTitle} or ${korTitle}`
  );
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(PATH);
  const sheet = workbook.getWorksheet(1);

  const ottList = [];

  for (let col = 2; col <= sheet.columnCount; col++) {
    for (let row = 1; row <= sheet.rowCount; row++) {
      const cellValue = sheet.getRow(row).getCell(col).value;
      if (cellValue === englishTitle || cellValue === korTitle) {
        const ottName = sheet.getRow(1).getCell(col).value;
        ottList.push(ottName);
        break;
      }
    }
  }

  console.log(`OTT list for "${englishTitle}":`, ottList);
  return ottList;
}

async function getOttapi(movieId) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  result = await axios
    .request(options)
    .then(function (response) {
      result = [];
      console.log(response.data);
      response.data.results.KR.flatrate.forEach((element) => {
        console.log(element.provider_name);
        const provider = {
          provider_name: element.provider_name,
          provider_id: element.provider_id,
        };
        result.push(provider);
      });
      if (response.data.results.KR) {
        return result;
      }
      if (response.data.result.KR.buy) {
        response.data.results.KR.buy.forEach((element) => {
          console.log(element.provider_name);
          const provider = {
            provider_name: element.provider_name,
            provider_id: element.provider_id,
          };
          result.push(provider);
        });
      }
      if (response.data.results.KR.buy) {
        response.data.results.KR.rent.forEach((element) => {
          console.log(element.provider_name);
          const provider = {
            provider_name: element.provider_name,
            provider_id: element.provider_id,
          };
          result.push(provider);
        });
      }
      result = set(result);
      console.log(result);
      return result;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}

module.exports = {
  getOttList,
  getOttapi,
};