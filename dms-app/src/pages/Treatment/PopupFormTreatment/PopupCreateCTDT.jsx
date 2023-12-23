import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PopupFormLDT from "./PopupCreateLDT";

const PopupFormCTDT = ({ handleClosePopup, ctdt, bdt, setBDT, handleCloseBDT }) => {
  const [isOpenPopupLDT, setIsOpenPopupLDT] = useState(false);
  const [loaiDieuTri, setLoaiDieuTri] = useState([]);
  const FormGroupStyle = {
    display: "flex",
    width: "100%",
  }

  async function handleAddBDT(e) {
    e.preventDefault();
    setBDT({
      tongquan: ctdt,
      chitietdieutri: loaiDieuTri,
    })
    handleClosePopup();
    handleCloseBDT();
    // KIỂM TRA ĐIỀU KIỆN
    // await addBDT(mabenhnhan, idbuoidieutri, mota, ghichu, ngay, khamchinh, trokham, kehoach);
    // alert("TẠO BUỔI ĐIỀU TRỊ THÀNH CÔNG");
  }

  function handleAddLDT(e) {
    e.preventDefault();
    setIsOpenPopupLDT(true);
  }

  function handleClosePopupLDT() {
    setIsOpenPopupLDT(false);
  }

  useEffect(() => {
    console.log(bdt);
  }, [bdt])

  return (<>
    <PopupWrapper>
      {isOpenPopupLDT && <PopupFormLDT handleClosePopup={handleClosePopupLDT} setLoaiDieuTri={setLoaiDieuTri} loaiDieuTri={loaiDieuTri}/>}
      <Form>
        <IoMdClose style={{ position: "absolute" , right: "10px", top:"5px"}} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">THÊM MỚI CHI TIẾT ĐIỀU TRỊ</div>
        <div style={{height: "370px", overflowY: "scroll"}}>
          {loaiDieuTri?.map((itemLdt) => {
            return <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
              <Form.Label style={{ width: "300px", fontWeight: "700" }}>LOẠI ĐIỀU TRỊ</Form.Label>
              <Form.Control type="text" placeholder=" Nhập mã điều trị " value={itemLdt.MADIEUTRI} style={{ width: "100%" }} />
            </Form.Group>
          })}
        </div>
        <ButtonGroup>
          <Button className="btn-add-ldt" onClick={handleAddLDT}>THÊM LOẠI ĐIỀU TRỊ</Button>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddBDT}> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormCTDT;

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
  padding-top: 2vh;
  
  .btn-cancel {
    background-color: var(--grey-line-color);
    font-weight: 700;
  }
  .btn-create {
    background-color: var( --btn-color-1);
    font-weight: 700;
  }
  .btn-add-ctr {
    background-color: var(--bg-blue-color);
    font-weight: 700;
  }
  .btn-add-ldt {
    background-color: var(--bg-blue-color);
    font-weight: 700;
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  padding: 10px 30px;
`
