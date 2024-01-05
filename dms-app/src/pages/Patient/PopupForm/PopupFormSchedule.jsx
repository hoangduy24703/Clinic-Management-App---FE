import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
// import Button from "../../../components/Button/Button";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import { postThemLichHen } from "../../../api/lichhen/lichhen";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const PopupFormSchedule = ({idbenhnhan, handleClosePopup}) => {
  const [ngayhen, setNgayhen] = useState(null);
  const [thoigianhen, setThoigianhen] = useState(null);
  const [tinhtrang, setTinhtrang] = useState(null);
  const [phong, setPhong] = useState(null);
  const [ghichu, setGhichu] = useState(null);
  const [benhnhan, setBenhnhan] = useState(idbenhnhan);
  const [trokham, setTrokham] = useState(null);


  async function updateInforPatient(e) {
    e.preventDefault();
    console.log(benhnhan);
    if (!ngayhen || !thoigianhen) {
      alert("THIẾU THÔNG TIN ĐẶT LỊCH");
      handleClosePopup();
      return;
    }
    const a = await postThemLichHen(ngayhen, thoigianhen, tinhtrang, phong, ghichu, 'NS000003', benhnhan, trokham);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("ĐẶT LỊCH THÀNH CÔNG");
    }
    else {
      alert("ĐẶT THẤT BẠI");
    }
    handleClosePopup();
  }

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">ĐẶT LỊCH HẸN</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NGÀY HẸN</Form.Label>
          <CustomDatePicker
            selected={ngayhen}
            onChange={(date) => setNgayhen(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GIỜ HẸN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập giờ hẹn " onChange={e => setThoigianhen(e.target.value)} value={thoigianhen} />
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={updateInforPatient}>TẠO</Button>
        </ButtonGroup> 
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormSchedule;

const PopupWrapper = styled.div`
  position: fixed;
  top: 15%;
  left: 22%;
  right: 22%;
  bottom: 40%;
  width: auto;
  height: auto;
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
    font-weight: 700;
    background-color: var(--grey-line-color);
  }
  .btn-create {
    font-weight: 700;
    background-color: var( --btn-color-1);
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  padding: 10px 30px;
`

const CustomDatePicker = styled(DatePicker)`
  padding: 5px;
  width: 100%;
`
