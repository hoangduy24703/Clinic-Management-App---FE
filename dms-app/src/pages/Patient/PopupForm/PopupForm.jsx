import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import Button from "../../../components/Button/Button";
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const PopupForm = ({handleClosePopup}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bornYear, setBornYear] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [overview, setOverview] = useState("");
  const [contraindicatedDrugs, setContraindicatedDrugs] = useState("");

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  const buttonContent = {
    name: <IoMdAddCircleOutline size="20px"/>,
    title: "Tạo"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI HỒ SƠ BỆNH NHÂN</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle} >
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID bệnh nhân " onChange={(event) => { setId(event.target.value) }} value={id} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>HỌ VÀ TÊN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên bệnh nhân " onChange={(event) => { setName(event.target.value) }} value={name} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle} >
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GIỚI TÍNH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập giới tính " onChange={(event) => { setGender(event.target.value) }} value={gender} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ĐỊA CHỈ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập địa chỉ " onChange={(event) => { setAddress(event.target.value) }} value={address} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>SĐT</Form.Label>
          <Form.Control type="text" placeholder=" Nhập số điện thoại " onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NĂM SINH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập năm sinh " onChange={(event) => { setBornYear(event.target.value) }} value={bornYear} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TUỔI</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tuổi " onChange={(event) => { setAge(event.target.value) }} value={age} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÌNH TRẠNG DỊ ỨNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tình trạng dị ứng" onChange={(event) => { setStatus(event.target.value) }} value={status} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THÔNG TIN TỔNG QUAN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập thông tin sức khỏe tổng quan " onChange={(event) => { setOverview(event.target.value) }} value={overview} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THUỐC CHỐNG CHỈ ĐỊNH</Form.Label>
          <Form.Control type="text" placeholder=" Thông tin chống chỉ định " onChange={(event) => { setContraindicatedDrugs(event.target.value) }} value={contraindicatedDrugs} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group >
          <Button content={buttonContent} bgColor={"var( --bg-blue-2-color)"} style={{ right:"10px", position: "absolute", color: "black"}} onClick={handleClosePopup} />
        </Form.Group>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupForm;

const PopupWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 25%;
  right: 25%;
  z-index: 2;
  padding: 5vw;
  background-color: var(--bg-grey-1-color);
  border-radius: 10px;
  border: 1px solid;

  .popup-title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4vh;
    margin-top: -5vh;
  }
`