import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addBDT } from "../../../api/dieutri/dieutri";

const PopupFormBDT = ({handleClosePopup}) => {
  const [mabenhnhan, setMabenhnhan] = useState('');
  const [idbuoidieutri, setIdbuoidieutri] = useState('') 
  const [mota, setMota] = useState('');
  const [ghichu, setGhichu] = useState('');
  const [ngay, setNgay] = useState(null);
  const [khamchinh, setKhamchinh] = useState('');
  const [trokham, setTrokham] = useState('');
  const [kehoach, setKehoach] = useState('');

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  async function handleAddBDT() {
    // KIỂM TRA ĐIỀU KIỆN
    await addBDT(mabenhnhan, idbuoidieutri, mota, ghichu, ngay, khamchinh, trokham, kehoach);
    alert("TẠO BUỔI ĐIỀU TRỊ THÀNH CÔNG");
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI BUỔI ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mã bệnh nhân " onChange={(event) => { setMabenhnhan(event.target.value) }} value={mabenhnhan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BUỔI ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id buổi điều trị " onChange={(event) => { setIdbuoidieutri(event.target.value) }} value={idbuoidieutri} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>MÔ TẢ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mô tả " onChange={(event) => { setMota(event.target.value) }} value={mota} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GHI CHÚ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ghi chú " onChange={(event) => { setGhichu(event.target.value) }} value={ghichu} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NGÀY</Form.Label>
          <DatePicker 
            selected={ngay}
            onChange={(ngay) => setNgay(ngay)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày điều trị"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>KHÁM CHÍNH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bác sĩ khám chính " onChange={(event) => { setKhamchinh(event.target.value) }} value={khamchinh} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TRỢ KHÁM</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bác sĩ trợ khám " onChange={(event) => { setTrokham(event.target.value) }} value={trokham} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>KẾ HOẠCH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id kế hoạch điều trị " onChange={(event) => { setKehoach(event.target.value) }} value={kehoach} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddBDT}><IoMdAddCircleOutline size="20px"/> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormBDT;

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