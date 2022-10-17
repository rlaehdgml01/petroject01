/**
 * @author : 최정우
 * @since : 2022.10.21
 * @dscription : Mysql DB Connection Pool 생성 관리 모듈 입니다. (private와 public object 환경 구성)
 */
const MysqlConnection = (function () {
  //Mysql DB Connection 라이브러리 모듈
  const mysql = require("mysql");

  //Connection Pool 객체 - private object(변수)
  const connectionPool = mysql.createPool({
    host: "localhost",
    user: "pet_care_matching_user",
    password: "1234",
    database: "pet_care_matching",
    ssl: false,
    port: 3306,
    max: 10,
  });

  return {
    getConnectionPool: function () {
      return connectionPool;
    },
    queryExcute: function (sql, params) {
      const result = new Promise((resolve, reject) => {
        connectionPool.getConnection(function (connectionError, connection) {
          if (!connectionError) {
            try {
              connection.query(
                sql,
                params,
                function (queryError, rows, columns) {
                  if (!queryError) {
                    resolve({ rows: rows, columns: columns });
                  } else {
                    reject(queryError);
                  }
                }
              );
            } catch (proccessError) {
              reject(proccessError);
            } finally {
              connection.release();
            }
          } else {
            reject(connectionError);
          }
        });

        /* connectionPool.getConnection().then(async (connection) => {
                    let queryResult = await connection.query(sql);
                    resolve(queryResult);
                    connection.release();
                }).catch((error) => {
                    reject(error);
                }); */
      });
      return result;
    },
  };
})();

module.exports = MysqlConnection;
