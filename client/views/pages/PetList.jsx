import React from "react";
import Button from "../components/ui/Button.jsx";
import Table from "../components/ui/Table.jsx";
import { Link } from "react-router-dom";

export default function PetList() {
  const [petListData, setPetListData] = React.useState([]);

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
    <input type="checkbox" />,
    "no",
    "제목",
    "등록일",
    "등록자",
  ];
  return (
    <div>
      <Table data={petListData} header={petHeaderList} />
      <Link to="/pages/petregister">
        <Button color={"#47B5FF"} title={"게시물 등록"} />
      </Link>
    </div>
  );
}
