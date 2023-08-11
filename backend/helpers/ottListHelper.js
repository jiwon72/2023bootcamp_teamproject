const ExcelJS = require("exceljs");

//EXCELJS의 문제로 인해 절대 경로만 사용 가능
const PATH =
  "D:\\workspace\\2023BOOTCAMP_TEAMPROJECT\\backend\\movie_info\\movieOTT.xlsx";

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

module.exports = {
  getOttList,
};
