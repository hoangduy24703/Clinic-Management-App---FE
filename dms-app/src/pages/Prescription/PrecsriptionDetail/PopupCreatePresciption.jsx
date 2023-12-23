import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addDonThuoc } from "../../../api/donthuoc/donthuoc";
import DatePicker from "react-datepicker";

const PopupCreatePrescription = ({handleClosePopup}) => {  
  const [iddonthuoc, setIddonthuoc] = useState("");
  const [ngaycap, setNgaycap] = useState("");
  const [idbuoidieutri, setIdbuoidieutri] = useState("");

  async function handleAddKHDT() {
    // KIỂM TRA ĐIỀU KIỆN
    // await postThemLichHen(ngayhen, thoigianhen, tinhtrang, phong, ghichu, bacsi, benhnhan, trokham);
    // alert("TẠO KẾ HOẠCH ĐIỀU TRỊ THÀNH CÔNG");
  }

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI ĐƠN THUỐC</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID ĐƠN THUỐC</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mã đơn thuốc " onChange={(event) => { setIddonthuoc(event.target.value) }} value={iddonthuoc} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NGÀY CẤP</Form.Label>
          <CustomDatePicker
            selected={ngaycap}
            onChange={(date) => setNgaycap(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày cấp"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BUỔI ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mã buổi điều trị " onChange={(event) => { setIdbuoidieutri(event.target.value) }} value={idbuoidieutri} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create"><IoMdAddCircleOutline size="20px" onClick={handleAddKHDT}/> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupCreatePrescription;

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
