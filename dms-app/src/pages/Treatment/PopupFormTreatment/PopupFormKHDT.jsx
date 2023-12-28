import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addKeHoach } from "../../../api/dieutri/dieutri";

const PopupFormKHDT = ({handleClosePopup}) => {
  const [idkhdt, setIdkhdt] = useState('');
  const [mota, setMota] = useState('') 
  const [trangthai, setTrangthai] = useState('');
  const [ghichu, setGhichu] = useState('');
  const [tonggia, setTonggia] = useState('');
  const [idbenhnhan, setIdbenhnhan] = useState('');
  const [bsphutrach, setBsphutrach] = useState('');

  async function handleAddKHDT(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    await addKeHoach(idkhdt, mota, trangthai, ghichu, tonggia, idbenhnhan, bsphutrach);
    alert("TẠO KẾ HOẠCH ĐIỀU TRỊ THÀNH CÔNG");
  }

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI KẾ HOẠCH ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID KẾ HOẠCH ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id kế hoạch điều trị " onChange={(event) => { setIdkhdt(event.target.value) }} value={idkhdt} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>MÔ TẢ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mô tả " onChange={(event) => { setMota(event.target.value) }} value={mota} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TRẠNG THÁI</Form.Label>
          <Form.Control type="text" placeholder=" Nhập trạng thái " onChange={(event) => { setTrangthai(event.target.value) }} value={trangthai} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GHI CHÚ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ghi chú " onChange={(event) => { setGhichu(event.target.value) }} value={ghichu} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TỔNG GIÁ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tổng giá " onChange={(event) => { setTonggia(event.target.value) }} value={tonggia} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bệnh nhân " onChange={(event) => { setIdbenhnhan(event.target.value) }} value={idbenhnhan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BÁC SĨ PHỤ TRÁCH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id bác sĩ phụ trách " onChange={(event) => { setBsphutrach(event.target.value) }} value={bsphutrach} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create"><IoMdAddCircleOutline size="20px" onClick={handleAddKHDT}/> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormKHDT;

const PopupWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 22%;
  right: 22%;
  z-index: 2;
  padding: 5vw;
  padding-bottom: 2vw;
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
const ButtonGroup = styled.div`
  display: flex;
  padding-top: 2vh;
  .btn-cancel {
    background-color: var(--grey-line-color);
  }
  .btn-create {
    background-color: var( --btn-color-1);
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  padding: 10px 30px;
`