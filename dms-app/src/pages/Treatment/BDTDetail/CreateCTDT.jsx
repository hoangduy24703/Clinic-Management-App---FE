import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { addChiTietDT } from "../../../api/dieutri/dieutri";
import { useNavigate } from "react-router-dom";

const CreateCTDT = ({ handleClosePopup, IDBUOIDIEUTRI }) => {
  const [madieutri, setMadieutri] = useState(null);
  const navigate = useNavigate();

  const FormGroupStyle = {
    display: "flex",
    width: "100%",
  }

  async function handleCreateCTDT(e) {
    e.preventDefault();
    const a = await addChiTietDT(IDBUOIDIEUTRI, madieutri);
    if (a?.data?.isSuccess) {
      alert("TẠO CHI TIẾT ĐIỀU TRỊ THÀNH CÔNG");
      navigate('treatment-plan');
      return;
    }
    else {
      alert("TẠO CHI TIẾT ĐIỀU TRỊ THẤT BẠI");
      handleClosePopup();
      return;
    }
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">THÊM MỚI LOẠI ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>LOẠI ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder=" " value={IDBUOIDIEUTRI} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>LOẠI ĐIỀU TRỊ</Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setMadieutri(e.target.value)} >
            <option disabled>Chọn loại điều trị</option>
            <option value="CT" >Chữa tủy</option>
            <option value="CVR" >Cạo vôi răng</option>
            <option value="NR" >Nhổ răng</option>
            <option value="TK" >Thăm khám</option>
            <option value="TRS" >Trồng răng sứ</option>
            <option value="NRCN" >Niềng - Chỉnh nha</option>
            <option value="TR" >Trám răng</option>
          </Form.Select>
        </Form.Group>
        
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleCreateCTDT}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default CreateCTDT;

const PopupWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  z-index: 3;
  padding: 5vw;
  padding-bottom: 2vw;
  background-color: var(--bg-grey-1-color);
  border-radius: 10px;
  border: 1px solid;
  width: auto;
  height: auto;

  .popup-title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4vh;
    margin-top: -5vh;
  }
`
const ButtonGroup = styled.div`
  display: flex;

  .btn-cancel {
    font-weight: 700;
    background-color: var(--grey-line-color);
  }
  .btn-create {
    font-weight: 700;
    background-color: var( --btn-color-1);
  }
  .btn-add-ctr {
    font-weight: 700;
    background-color: var(--bg-blue-color);
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  padding: 10px 30px;
`
