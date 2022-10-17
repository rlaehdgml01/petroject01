import React, { useRef } from "react";
import Button from "../components/ui/Button.jsx";

export default function Register() {
  const id = useRef();
  const password = useRef();
  const checkId = () => {

  }
  /* const checkId = () => {
    fetch(url).then((response) => {
      console.log(response.data)
    }).catch((err) => {
      console.log(err)
    })
  } */
  //post
  /* const Post = () => {
    fetch(url, {
      method: "POST",
      headers: {
        
      },
      body: {
        
      }
    }).then((res) => console.log(res.json()))
  } */
  return (
    <div>
      <label>ID</label>
      <input ref={id} type="text" placeholder="아이디를 입력하세요." minLength={6} />
      <Button onClick={checkId} title={"아이디중복검사"} />
      <label>Password</label>
      <input ref={password} type="text" minLength={13} />
      <label>Password 확인</label>
      <input type="text" minLength={13} />
      <label>이름</label>
      <input type="text" />
      <label>연락처</label>
      <input type="number" />
      <label>생년월일</label>
      <input type="date" />
    </div>
  );
}
