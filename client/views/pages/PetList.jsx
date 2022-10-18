import React from "react";
import Button from "../components/ui/Button.jsx";
import Table from "../components/ui/Table.jsx";
import { Link,useNavigate } from "react-router-dom";

export default function PetList() {
  const [petListData, setPetListData] = React.useState([]);

  //동적으로 URL(페이지)를 변경할 때 사용
  const navigate = useNavigate();

  const careRequestSelectList = () => {
    fetch("/careRequestSelectList.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPetListData(data);
      })
      .catch((error) => {
        console.log("getData() /getData error : ", error);
      });
  };

  React.useEffect(() => {
    careRequestSelectList();
  }, []);

  const petHeaderList = [
    "no",
    "제목",
    "등록일",
    "등록자",
  ];

  const goPetDetailPage = (item)=>{
    console.log(item);
    let urlParam= {
      state : {
        care_request_number : item.care_request_number
      }
    }
    navigate('/pages/petDetail',urlParam);
  }

  return (
    <div>
      <Table data={petListData} header={petHeaderList} onClick={goPetDetailPage}/>
      <Link to="/pages/petregister">
        <Button color={"#47B5FF"} title={"게시물 등록"} />
      </Link>
    </div>
  );
}
