const express = require("express");
const webServer = express();

const session = require("express-session");

const MemoryStore = require('memorystore')(session);

const { BASE_DIR } = require("../../Global");

console.log("BASE_DIR : ", BASE_DIR);

//request 정보를 받을 시, Body의 값을 받아올 수 있도록 해주는 express 설정
webServer.use(express.json());
webServer.use(express.urlencoded({ extended: false }));

/************* DB 연결 테스트 (시작) *************/
const MysqlConnection = require("../module/db/MysqlConnection");

webServer.use(session({
  secret: 'session-test',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({checkPeriod:1000*60*60*2}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  },
}));

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

webServer.get('/', function (request, response) {
  console.log('/ request session : ', request.session);
  if (request.session['user_id'] == undefined || request.session['user_id'] == null) {
    response.redirect('/login.html');
  } else {
    response.sendFile(`${BASE_DIR}/client/views/index.html`);
  }
});

//로그인
webServer.get('/login.html', function (request, response) {
  console.log('/login.html request session : ', request.session);
  //response.send('text response');
  //response.sendFile(BASE_DIR + '/client/views/index.html');
  //response.sendFile(`${BASE_DIR}/client/views/login.html`);
  if(request.session['user_id'] == undefined || request.session['user_id'] == null) {
    response.sendFile(`${BASE_DIR}/client/views/login.html`);
  }else{
    response.redirect('/');
  }
});
//로그인 데이터
webServer.post('/login.json', function (request, response) {
  console.log('/login.json request session : ', request.session);

  let queryParam=[
    request.body['user_id'],
    request.body['password'],
  ];

  let queryResult = MysqlConnection.queryExcute(`
    SELECT
      COUNT(0) AS count
    FROM
      user
    WHERE
      user_id = ?
    AND
      pw = ?
  `, queryParam);

  queryResult.then(function (result) {
    if (result.rows[0].count > 0){
      request.session['user_id'] = request.body['user_id'];
      try{
        request.session.save(function () {
          response.json({isSuccess: true, message: '로그인 성공'});
        })
      }catch (e) {
        response.json({isSuccess: false, message: '로그인 처리 에러'});
      }
    }else{
      response.json({isSuccess: false, message:'아이디와 비밀번호를 확인해주세요'})
    }
  }).catch(function (error) {
    console.log('error : ',error);
    response.json(error);
  });
});

//로그아웃
webServer.post('/logout.json', function (request, response) {
  console.log('/logout.json request session : ', request.session);
    /*request.session['user_id']=null;
    try{
      request.session.save(function () {
        response.json({isSuccess: true, message: '로그아웃 성공'});
      })
    }catch (e) {
       response.json({isSuccess: false, message: '로그아웃 처리 에러'});
    }*/
    //Express session 제거(단, 제거가 완료된 후, 서버에 다시 접근하면 새로운 세션이 생김)
    try {
      request.session.destroy(function(err){
        console.log('session destroy error : ', err);
        if (err != undefined || err != null) {
          response.json({isSuccess: false, message: '로그아웃 처리 에러'});
        } else {
          response.json({isSuccess: true, message: '로그아웃 성공'});
        }
      });
    } catch (e) {
      console.log('session destory error23 : ', err);
      response.json({isSuccess: false, message: '로그아웃 처리 에러'});
    }
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
      , '${request.session['user_id']}'
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

// careRequest 게시글 조회 기능
webServer.get('/careRequestSelectOne.json', function (request, response) {
  let queryParam = [request.query['care_request_number']];
  console.log(request.query);

  const queryResult = MysqlConnection.queryExcute(`
    SELECT * FROM care_request_bbs WHERE care_request_number = ?
  `,queryParam);

  queryResult.then(function (result) {
    console.log(result.rows);
    response.json(result.rows);
  }).catch(function (error) {
    console.log('error : '+ error);
    response.json(error)
  })
});

//수정
webServer.post("/careRequestUpdate.json", function (request, response) {
  console.log("/careRequestUpdate.json request body : ", request.body);

  let queryParam = [
    request.body["care_request_title"],
    request.body["care_request_content"],
    request.body["pet_name"],
    request.body["pet_age"],
    request.body["pet_animal_type"],
    request.body["pet_animal_kind"],
    request.body["pet_sex"],
    request.body["care_request_number"]
  ];

  const queryResult = MysqlConnection.queryExcute(
    `
    UPDATE
      care_request_bbs
    SET
      care_request_title = ?
        , care_request_content = ?
        , pet_name = ?
        , pet_age = ?
        , pet_animal_type = ?
        , pet_animal_kind = ?
        , pet_sex = ?
    WHERE
      care_request_number = ?
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

// careRequest 게시글 삭제 기능
webServer.get('/careRequestDelete.json', function (request, response) {
  let queryParam = [request.query['care_request_number']];
  console.log(request.query);

  const queryResult = MysqlConnection.queryExcute(`
    DELETE
    FROM
      care_request_bbs
    WHERE
      care_request_number = ?
  `,queryParam);

  queryResult.then(function (result) {
    console.log(result.rows);
    response.json(result.rows);
  }).catch(function (error) {
    console.log('error : '+ error);
    response.json(error)
  })
});

/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : ROOT URL, Router's, 화면요청 URL 등.. 이 외 나머지 정적 자원에 대한 처리 기능
 */
 webServer.get('*.*', function (request, response, next) {
  response.sendFile(`${BASE_DIR}${request.params['0']}.${request.params['1']}`);
})