import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { postThemLichHen } from "../../api/lichhen/lichhen";
import DatePicker from "react-datepicker";

const PopupFormCreateSchedule = ({handleClosePopup}) => {  
  const [ngayhen, setNgayhen] = useState("");
  const [thoigianhen, setThoigianhen] = useState("");
  const [tinhtrang, setTinhtrang] = useState("");
  const [phong, setPhong] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [bacsi, setBacsi] = useState("");
  const [benhnhan, setBenhnhan] = useState("");
  const [trokham, setTrokham] = useState("");

  async function handleAddKHDT() {
    // KIỂM TRA ĐIỀU KIỆN
    await postThemLichHen(ngayhen, thoigianhen, tinhtrang, phong, ghichu, bacsi, benhnhan, trokham);
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
        <div className="popup-title">THÊM MỚI LỊCH HẸN</div>
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
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THỜI GIAN HẸN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mô tả " onChange={(event) => { setThoigianhen(event.target.value) }} value={thoigianhen} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>PHÒNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập trạng thái " onChange={(event) => { setPhong(event.target.value) }} value={phong} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÌNH TRẠNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ghi chú " onChange={(event) => { setTinhtrang(event.target.value) }} value={tinhtrang} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GHI CHÚ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tổng giá " onChange={(event) => { setGhichu(event.target.value) }} value={ghichu} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bệnh nhân " onChange={(event) => { setBenhnhan(event.target.value) }} value={benhnhan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BÁC SĨ PHỤ TRÁCH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id bác sĩ phụ trách " onChange={(event) => { setBacsi(event.target.value) }} value={bacsi} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TRỢ KHÁM</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id bác sĩ phụ trách " onChange={(event) => { setTrokham(event.target.value) }} value={trokham} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create"><IoMdAddCircleOutline size="20px" onClick={handleAddKHDT}/> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormCreateSchedule;

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

const CustomDatePicker = styled(DatePicker)`
  padding: 5px;
  width: 100%;
`
