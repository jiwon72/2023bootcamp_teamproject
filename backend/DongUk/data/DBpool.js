const mysql = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
//let을 쓰는 이유 pool이 켜지고 닫히는 가변적인 값이기 때문에 const로 선언하면 안된다.
let pool = mysql.createPool(config);

function getConnection(callback) {
  //getConnection은 인자로 함수를 받아 함수에 connection 개체를 넣어준다.
  //따라서 이를 불러올 때 connection을 인자로 받아 사용할 수 있다.
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;
