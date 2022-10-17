const express = require("express");
const webServer = express();

const { BASE_DIR } = require("../../Global");

console.log("BASE_DIR : ", BASE_DIR);

//request 정보를 받을 시, Body의 값을 받아올 수 있도록 해주는 express 설정
webServer.use(express.json());
webServer.use(express.urlencoded({ extended: false }));

/************* DB 연결 테스트 (시작) *************/
const MysqlConnection = require("../module/db/MysqlConnection");

//비동기처리 : 오래걸리는 작업은 나중으로 미뤄놀고 백그라운드에서 처리 후, 결과를 응답해줌
// 비동기 처리 결과 받는 방범
// 1. Callback 사용
/* function callback함수 () {
  console.log('1초가 지났습니다.');
}
setTimeout(callback함수, 1000);
console.log('콘솔찍기') */
// 2. Promise 객체 활용
const queryResult = MysqlConnection.queryExcute("select * from user");
//queryExcute : DB접속 -> SQL 질의(querying) -> 질의 결과 받고 -> 결과 reuturn 과정 오래걸리는 로직
queryResult
  .then(function (result) {
    console.log("queryResult result : ", result.rows);
  })
  .catch(function (error) {
    console.log(error);
  });
console.log("queryResult :", queryResult);
/************* DB 연결 테스트 (종료) *************/

webServer.listen(8080, function () {
  console.log("8080Port Nodejs Express를 활용한 Web Server 구동");
});

webServer.get("/", function (request, response) {
  console.log("/ request");
  //response.send('text response');
  //response.sendFile(BASE_DIR + '/client/views/index.html');
  response.sendFile(`${BASE_DIR}/client/views/index.html`);
});

webServer.get("/client/build/bundle.js", function (request, response) {
  console.log("/client/build/bundle.js request");
  //response.sendFile(BASE_DIR + '/client/build/bundle.js');
  response.sendFile(`${BASE_DIR}/client/build/bundle.js`);
});

//petRequest 등록 URL
webServer.post("/careRequestInsert.json", function (request, response) {
  console.log("/careRequestInsert.json request body : ", request.body);

  let queryParam = [
    request.body["careRequestTitle"],
    request.body["careRequestContent"],
    request.body["petName"],
    request.body["petAge"],
    request.body["petAnimalType"],
    request.body["petAnimalKind"],
    request.body["petSex"],
  ];

  const queryResult = MysqlConnection.queryExcute(
    `
  INSERT INTO care_request_bbs (
    care_request_number
    , care_request_title
      , care_request_content
      , pet_name
      , pet_age
      , pet_animal_type
      , pet_animal_kind
      , pet_sex
      , care_request_insert_datetime
      , care_request_insert_user_id
  ) VALUES (
    (SELECT IFNULL(MAX(A.care_request_number), 0) + 1 FROM care_request_bbs A)
      , ?
      , ?
      , ?
      , ?
      , ?
      , ?
      , ?
      , NOW()
      , 'test_user'
  ) 
  `,
    queryParam
  );

  queryResult
    .then(function (result) {
      response.json(result.rows);
    })
    .catch(function (error) {
      response.json(error);
    });
});

//careRequest 게시글 목록 조회
webServer.get("/careRequestSelectList.json", function (request, response) {
  const queryResult = MysqlConnection.queryExcute(`
    SELECT
      care_request_number
      , care_request_title
      , care_request_insert_datetime
      , care_request_insert_user_id
    FROM
      care_request_bbs
    ORDER BY
      care_request_insert_datetime DESC
  `);

  queryResult
    .then(function (result) {
      response.json(result.rows);
    })
    .catch(function (error) {
      response.json(error);
    });
});
