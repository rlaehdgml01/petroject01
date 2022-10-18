import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/ui/Button.jsx";
import { useNavigate,useLocation } from "react-router-dom";

export default function PetUpdate() {
  //동적으로 URL(페이지)를 변경할 때 사용
  const navigate = useNavigate();

  const location = useLocation();

  //careRequest 수정 정보 초기화
  const [careRequest, setCareRequest] = useState({
    care_request_number: 0,
    care_request_title: '',
    care_request_content: '',
    pet_name: '',
    pet_age: 0,
    pet_animal_type: '',
    pet_animal_kind: '',
    pet_sex: '',
    care_request_insert_datetime: '',
    care_request_insert_user_id: '',
    matching_datetime: null,
    matching_status: null,
    care_provide_user_id: null
  });

  const careRequestSelectOne = () => {
    let httpRequestUrl = `/careRequestSelectOne.json?care_request_number=${location.state['care_request_number']}`
    console.log('httpRequestUrl : '+ httpRequestUrl);
    fetch(httpRequestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCareRequest(data[0]);
      })
      .catch((error) => {
        console.log("getData() /getData error : ", error);
      });
  };

  React.useEffect(() => {
    careRequestSelectOne();
  }, []);

  //careRequest 등록 정보가 변경될 시, 작동하는 함수
  function careRequestChange(e, target) {
    console.log(e.target.value, target);
    //careRequest.careRequestTitle = e.target.value;
    //careRequest['careRequestTitle'] = e.target.value;
    careRequest[target] = e.target.value;
    let copyCareRequest = JSON.parse(JSON.stringify(careRequest));

    //careRequest = {};//X -> 오류
    //careRequest['변수명'] = '값';//O
    setCareRequest(copyCareRequest);
  }

  //petRequest 등록 함수
  function careRequestUpdate() {
    console.log("careRequest : ", careRequest);
    fetch("/careRequestUpdate.json", {
      method: "POST",
      body: JSON.stringify(careRequest),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "careRequestUpdate() /careRequestUpdate.json result : ",
          data
        );
        alert("수정이 완료 되었습니다");
        navigate("/pages/petDetail", {state:{care_request_number:location.state.care_request_number}});
      })
      .catch((error) => {
        console.log(
          "careRequestUpdate() /careRequsetUpdate.json error : ",
          error
        );
      });
  }

  return (
    <FormStyled>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={careRequest.care_request_title}
          onChange={(e) => careRequestChange(e, "care_request_title")}
        />
      </div>
      <div>
        <label>내용</label>
        <input
          type="text"
          value={careRequest.care_request_content}
          onChange={(e) => careRequestChange(e, "care_request_content")}
        />
      </div>
      <div>
        <label>이름</label>
        <input
          type="text"
          value={careRequest.pet_name}
          onChange={(e) => careRequestChange(e, "pet_name")}
        />
      </div>
      <div>
        <label>나이</label>
        <input
          type="text"
          value={careRequest.pet_age}
          onChange={(e) => careRequestChange(e, "pet_age")}
        />
      </div>
      <div>
        <label>성별</label>
        <select
          value={careRequest.pet_sex}
          onChange={(e) => careRequestChange(e, "pet_sex")}
        >
          <option value="">성별</option>
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </div>
      <div>
        <label>동물종</label>
        <input
          type="text"
          value={careRequest.pet_animal_type}
          onChange={(e) => careRequestChange(e, "pet_animal_type")}
        />
      </div>
      <div>
        <label>품종</label>
        <input
          type="text"
          value={careRequest.pet_animal_kind}
          onChange={(e) => careRequestChange(e, "pet_animal_kind")}
        />
      </div>

      <Button color={"#47B5FF"} title={"수정"} onClick={careRequestUpdate} />
    </FormStyled>
  );
}

const FormStyled = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;
