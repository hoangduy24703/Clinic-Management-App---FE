import { Fragment, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const PopupFormCTR = ({ handleClosePopup, setRangDieuTri, RangDieuTri }) => {
  const [tenRang, setTenRang] = useState(null);
  const [matDieuTri, setMatDieuTri] = useState(null);

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  function handleAddCTR(e) {
    e.preventDefault();
    if (!tenRang || !matDieuTri) {
      alert("THIẾU TÊN VÀ MẶT RĂNG ĐIỀU TRỊ");
      return;
    }
    setRangDieuTri([...RangDieuTri, {
      TENRANG: tenRang,
      MATDIEUTRI: matDieuTri
    }]);
    handleClosePopup();
  }


  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">THÊM MỚI CHI TIẾT RĂNG</div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
            <Form.Label style={{ width: "300px", fontWeight: "700" }}>TÊN RĂNG</Form.Label>
            <Form.Control type="text" placeholder=" Nhập tên răng " onChange={(event) => {setTenRang(event.target.value)}} value={tenRang} style={{ width: "100%" }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
            <Form.Label style={{ width: "300px", fontWeight: "700" }}>MẶT ĐIỀU TRỊ</Form.Label>
            <Form.Control type="text" placeholder=" Nhập mặt điều trị " onChange={(event) => {setMatDieuTri(event.target.value)}} value={matDieuTri} style={{ width: "100%" }} />
          </Form.Group>
        </div>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddCTR}>THÊM</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormCTR;

const PopupWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  z-index: 4;
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
  padding-top: 2vh;
  .btn-cancel {
    font-weight: 700;
    background-color: var(--grey-line-color);
  }
  .btn-create {
    font-weight: 700;
    background-color: var( --btn-color-1);
  }
  .btn-add {
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
