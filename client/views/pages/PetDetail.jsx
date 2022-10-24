import React,{useState} from 'react'
import styled from 'styled-components';
import Button from "../components/ui/Button.jsx";
import { useLocation,useNavigate } from 'react-router-dom';
import '../../resources/main.css';

const PetDetail= () => {

    const navigate = useNavigate();

    const location = useLocation();
    console.log('location.state : '+ location.state);

    //careRequest 상세 정보 변수 선언(초기화)
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
    //setCareRequest(data[0]);


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

      //목록으로 이동하는 함수 정의
      const goPetListPage = () => {
        navigate('/');
      }
      //수정페이지로 이동하는 함수 정의
      const goPetUpdatePage = () => {
        navigate("/pages/petupdate",{state : {care_request_number : location.state['care_request_number']}});
      }
      //careRequest 정보 삭제 함수 정의
      const careRequestDelete = () => {
        let confirm = window.confirm("삭제하시겠습니까?");

        if (confirm=true){let httpRequestUrl = `/careRequestDelete.json?care_request_number=${location.state['care_request_number']}`
        console.log('httpRequestUrl : '+ httpRequestUrl);

        fetch(httpRequestUrl,{
            method: "GET",
            headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }}).then(function(result){
            console.log('careRequestDelete() / careRequestDelete.json result : ', result);
            goPetListPage();
            alert('삭제되었습니다');
        }).catch(function(error){
            console.log('careRequestDelete() /careRequestDelete.json error : ', error);
        });
        }
        else{
            return;
        }
      }

  return (
    <>
        <FormStyled>
      <div className='detail-style'>
        <label>제목</label>:
        <span>{careRequest.care_request_title}</span>
      </div>
      <div className='detail-style'>
        <label>내용</label>:
        <span>{careRequest.care_request_content}</span>
      </div>
      <div className='detail-style'>
        <label>이름</label>:
        <span>{careRequest.pet_name}</span>
      </div>
      <div className='detail-style'>
        <label>나이</label>:
        <span>{careRequest.pet_age}</span>
      </div>
      <div className='detail-style'>
        <label>성별</label>:
        <span>{careRequest.pet_sex}</span>
      </div>
      <div className='detail-style'>
        <label>동물종</label>:
        <span>{careRequest.pet_animal_type}</span>
              </div>
      <div className='detail-style'>
        <label>품종</label>:
        <span>{careRequest.pet_animal_kind}</span>
      </div>
      <div className='detail-style'>
        <label>등록일</label>:
        <span>{careRequest.matching_datetime}</span>
      </div>
      <div className='detail-style'>
        <label>등록자</label>:
        <span>{careRequest.care_provide_user_id}</span>
      </div>

      <Button color={"#skyblue"} title={"목록으로"} onClick={goPetListPage}/>
      <Button color={"#F2CB61"} title={"수정"} onClick={goPetUpdatePage}/>
      <Button color={"#F15F5F"} title={"삭제"} onClick={careRequestDelete}/>
    </FormStyled>
    </>
  )
}
const FormStyled = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;


export default PetDetail