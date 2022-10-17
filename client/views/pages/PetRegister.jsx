import React, { useState } from "react";
import styled from "styled-components";
import Button from "./../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function PetRegister() {
  //동적으로 URL(페이지)를 변경할 때 사용
  const navigate = useNavigate();
  //careRequest
  const [careRequest, setCareRequest] = React.useState({
    careRequestTitle: "",
    careRequestContent: "",
    petName: "",
    petAge: "",
    petAnimalType: "",
    petAnimalKind: "",
    petSex: "",
  });

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
  function petRequestInsert() {
    console.log("careRequest : ", careRequest);
    fetch("/careRequestInsert.json", {
      method: "POST",
      body: JSON.stringify(careRequest),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "careRequestInsert() /careRequestInsert.json result : ",
          data
        );
        alert("등록이 완료 되었습니다");
        navigate("/");
      })
      .catch((error) => {
        console.log(
          "careRequestInsert() /careRequsetInsert.json error : ",
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
          value={careRequest.careRequestTitle}
          onChange={(e) => careRequestChange(e, "careRequestTitle")}
        />
      </div>
      <div>
        <label>내용</label>
        <input
          type="text"
          value={careRequest.careRequestContent}
          onChange={(e) => careRequestChange(e, "careRequestContent")}
        />
      </div>
      <div>
        <label>이름</label>
        <input
          type="text"
          value={careRequest.petName}
          onChange={(e) => careRequestChange(e, "petName")}
        />
      </div>
      <div>
        <label>나이</label>
        <input
          type="text"
          value={careRequest.petAge}
          onChange={(e) => careRequestChange(e, "petAge")}
        />
      </div>
      <div>
        <label>성별</label>
        <select
          value={careRequest.petSex}
          onChange={(e) => careRequestChange(e, "petSex")}
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
          value={careRequest.petAnimalType}
          onChange={(e) => careRequestChange(e, "petAnimalType")}
        />
      </div>
      <div>
        <label>품종</label>
        <input
          type="text"
          value={careRequest.petAnimalKind}
          onChange={(e) => careRequestChange(e, "petAnimalKind")}
        />
      </div>

      <Button color={"#47B5FF"} title={"등록"} onClick={petRequestInsert} />
    </FormStyled>
  );
}

const FormStyled = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;
