import React, { useRef } from "react";
import { Box } from "@mui/material";

export default function Register() {
  const id = useRef();
  const password = useRef();
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
    <Box maxWidth='sm'>
      <label>ID</label>
      <input ref={id} type="text" placeholder="아이디를 입력하세요." minLength={6} />
      <button>아이디 중복검사</button><br/>
      <label>Password</label>
      <input ref={password} type="text" placeholder="비밀번호를 입력하세요." minLength={13} />
      <label>Password 확인</label>
      <input type="text" minLength={13} />
      <label>이름</label>
      <input type="text" placeholder="성함을 입력해 주세요."/>
      <label>연락처</label>
      <input type="text" />
      <label>생년월일</label>
      <input type="date" />
      <button type="submit">가입</button>
    </Box>
  );
}
