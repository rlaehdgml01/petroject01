import React from "react";

export default function Header() {
  function logout() {
    fetch("/logout.json", {
      method: "POST",
      //body: JSON.stringify({'user_id':user_id, 'password':password}),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("logout() / logout.json : ",data);
        alert(data.message);
        if(data.isSuccess == true) {
            window.location.href='/login.html';
        }else{

        }
        //navigate("/");
      })
      .catch((error) => {console.log("careRequestInsert() /careRequsetInsert.json error : ",error);
      });
  }
  return (
   
    <header>
      <h1 className="logo">펫 케어 서비스 매칭</h1>
      <button onClick={logout}>로그아웃</button>
    </header>
  );
}
