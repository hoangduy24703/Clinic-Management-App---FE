import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PopupFormCTDT from "./PopupCreateCTDT";
import { addBDT } from "../../../api/dieutri/dieutri";

const PopupFormBDT = ({handleClosePopup}) => {
  const [mabenhnhan, setMabenhnhan] = useState('');
  const [mota, setMota] = useState('');
  const [ghichu, setGhichu] = useState('');
  const [ngay, setNgay] = useState(null);
  const [khamchinh, setKhamchinh] = useState('');
  const [trokham, setTrokham] = useState('');
  const [kehoach, setKehoach] = useState('');
  const [nextStep, setNextStep] = useState(false); 
  const [ctdt, setCtdt ]= useState({});
  const [bdt, setBDT] = useState({});

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  function handleNextStep(e) {
    e.preventDefault();
    // if (!mabenhnhan || !ngay || !khamchinh || !kehoach)
    //   return;
    setCtdt({
      mabenhnhan: mabenhnhan,
      mota: mota,
      ghichu: ghichu,
      ngay: ngay,
      khamchinh: khamchinh,
      trokham: trokham,
      kehoach: kehoach,
    })
    setNextStep(true);
  }

  function handleCloseNextStep() {
    setNextStep(false);
  }

  useEffect(() => {
    console.log(bdt);
  }, [bdt]);

  return (<>
    <PopupWrapper>
      {nextStep && <PopupFormCTDT handleClosePopup={handleCloseNextStep} ctdt={ctdt} bdt={bdt} setBDT={setBDT} handleCloseBDT={handleClosePopup}/> }
      <Form>
        <IoMdClose style={{position: "absolute", right: "20px", top: "10px"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI BUỔI ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mã bệnh nhân " onChange={(event) => { setMabenhnhan(event.target.value) }} value={mabenhnhan} style={{width: "100%"}}/>
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
          <button className="btn-cancel" onClick={handleClosePopup}>HỦY</button>
          <button className="btn-create" onClick={handleNextStep} >TIẾP</button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormBDT;

const PopupWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  z-index: 2;
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
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    padding: 10px 30px;
  }
  .btn-create {
    background-color: var( --btn-color-1);
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    padding: 10px 30px;
  }
`

const Button = styled.button`
  
`