import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PopupFormCTR from "./PopupFormCTR";

const PopupFormLDT = ({ handleClosePopup, setLoaiDieuTri, loaiDieuTri }) => {
  const [madieutri, setMadieutri] = useState(null);
  const [RangDieuTri, setRangDieuTri] = useState([]);
  const [isOpenPopupCTR, setIsOpenPopupCTR] = useState(false);

  const FormGroupStyle = {
    display: "flex",
    width: "100%",
  }

  function handleClosePopupCTR() {
    setIsOpenPopupCTR(false);
  }

  function handleAddCTR(e) {
    e.preventDefault();
    setIsOpenPopupCTR(true);
  }

  function handleCreateLDT(e) {
    e.preventDefault();
    if (!madieutri || !RangDieuTri) {
      alert("THIẾU THÔNG TIN RĂNG VÀ LOẠI ĐIỀU TRỊ");
      return;
    }
    setLoaiDieuTri([...loaiDieuTri, {
      MADIEUTRI: madieutri,
      rangdt: RangDieuTri
    }]);
    handleClosePopup();
  }

  return (<>
    <PopupWrapper>
      {isOpenPopupCTR && <PopupFormCTR handleClosePopup={handleClosePopupCTR} setRangDieuTri={setRangDieuTri} RangDieuTri={RangDieuTri} />}
      <Form>
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">THÊM MỚI LOẠI ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>LOẠI ĐIỀU TRỊ</Form.Label>
          {/* <Form.Control type="text" placeholder=" Nhập mã điều trị " onChange={(event) => { setMadieutri(event.target.value) }} value={madieutri} style={{ width: "100%" }} /> */}
          <Form.Select aria-label="Default select example" onChange={e => setMadieutri(e.target.value)} >
            <option>Chọn loại điều trị</option>
            <option value="CT" >Chữa tủy</option>
            <option value="CVR" >Cạo vôi răng</option>
            <option value="NR" >Nhổ răng</option>
            <option value="TK" >Thăm khám</option>
            <option value="TRS" >Trồng răng sứ</option>
            <option value="NRCN" >Niềng - Chỉnh nha</option>
            <option value="TR" >Trám răng</option>
            {/* <Select options={options} onChange={handleChangeDVT} autoFocus={true} /> */}
          </Form.Select>
        </Form.Group>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          {RangDieuTri?.map((item, index) => {
            return <>
              <h4 style={{ textAlign: "center" }}> Răng {index + 1}</h4>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
                <Form.Label style={{ width: "300px", fontWeight: "700" }}>TÊN RĂNG</Form.Label>
                <Form.Control type="text" placeholder=" Nhập tên điều trị " value={item.TENRANG} style={{ width: "90%", marginRight: "10px" }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
                <Form.Label style={{ width: "300px", fontWeight: "700" }}>MẶT ĐIỀU TRỊ</Form.Label>
                <Form.Control type="text" placeholder=" Nhập mặt điều trị " value={item.MATDIEUTRI} style={{ width: "90%", marginRight: "10px" }} />
              </Form.Group>
            </>
          })}
        </div>
        <ButtonGroup>
          <Button className="btn-add-ctr" onClick={handleAddCTR}>THÊM CHI TIẾT RĂNG</Button>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleCreateLDT}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormLDT;

const PopupWrapper = styled.div`
  position: fixed;
  top: 10%;
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
