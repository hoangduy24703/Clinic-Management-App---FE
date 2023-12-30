import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import moment from "moment";

import DatePicker from "react-datepicker";
import { postThemLichLamViec } from "../../api/lichlamviec/lichlamviec";

const PopupFormCreateWorkSchedule = ({handleClosePopup}) => {  
  const [idnhanvien, setIDNhanVien] = useState("");
  const [ngay, setNgay] = useState("");
  const [idcalam, setIDCaLam] = useState("");
  
  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  async function handleAddLichLamViec(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    // console.log("co chay")
    const date = moment(ngay).format("YYYY-MM-DD");
    if (date.length !== 10 || !idnhanvien) {
      alert("CHƯA NHẬP ĐỦ THÔNG TIN");
      return;
    }
    const a = await postThemLichLamViec(idnhanvien, date, idcalam)
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("TẠO LỊCH LÀM VIỆC THÀNH CÔNG");
    }
    else {
      alert("TẠO LỊCH LÀM VIỆC THẤT BẠI");
    }
    handleClosePopup();
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI LỊCH LÀM VIỆC</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID NHÂN VIÊN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " onChange={(event) => { setIDNhanVien(event.target.value) }} value={idnhanvien} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>LỊCH LÀM VIỆC</Form.Label>
          <CustomDatePicker
            // utcOffset={0}
            selected={ngay}
            onChange={(date) => setNgay(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID CA LÀM</Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setIDCaLam(e.target.value)} >
                <option>Chọn ca làm </option>
                <option value="C1" > Ca 1 </option>
                <option value="C2" > Ca 2 </option>
                <option value="C3" > Ca 3 </option>
                <option value="C4" > Ca 4 </option>
            </Form.Select>
        </Form.Group>
    
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddLichLamViec}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormCreateWorkSchedule;

const PopupWrapper = styled.div`
  position: fixed;
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