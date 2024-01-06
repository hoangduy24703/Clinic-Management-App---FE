import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { postXoaLichHen } from "../../api/lichhen/lichhen";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PopupDeleteSchedule = ({handleClosePopup, data, selectedItem}) => {
  const navigate = useNavigate();
  const dataLH = selectedItem.BENHNHAN === undefined ? 
                                  data?.find((item) => item?.IDBENHNHAN === selectedItem?.IDBENHNHAN && item?.NGAYDT === selectedItem?.NGAYDT && item?.THOIGIANHEN === selectedItem?.THOIGIANHEN) : 
                                  data?.find((item) => item?.BENHNHAN === selectedItem?.BENHNHAN && item?.NGAYHEN === selectedItem?.NGAYHEN && item?.THOIGIANHEN === selectedItem?.THOIGIANHEN);
  const [ngayhen, setNgayhen] = useState(moment(dataLH?.NGAYHEN));
  const [thoigianhen, setThoigianhen] = useState(moment(dataLH?.THOIGIANHEN).add(16, 'hours'));
  const [tinhtrang, setTinhtrang] = useState(dataLH?.TINHTRANG);
  const [bacsi, setBacsi] = useState(dataLH?.BACSI === undefined ? dataLH?.IDNHANVIEN : dataLH?.BACSI);
  const [benhnhan, setBenhnhan] = useState(dataLH?.BENHNHAN === undefined ? dataLH?.IDBENHNHAN : dataLH?.BENHNHAN);

  async function handleDeleteLH(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    const a = await postXoaLichHen(moment(ngayhen).format("YYYY-MM-DD"), moment(thoigianhen).format("HH:mm:ss"), bacsi, benhnhan);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("XÓA LỊCH HẸN THÀNH CÔNG");
      navigate(`/appointment-schedule/by-patient`);
    }
    else {
      alert("XÓA LỊCH HẸN THẤT BẠI");
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
        <div className="popup-title">BẠN CÓ CHẮC MUỐN XÓA LỊCH HẸN?</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NGÀY HẸN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ngày hẹn " onChange={(event) => { setNgayhen(event.target.value) }} value={moment(dataLH?.NGAYHEN).format("DD/MM/YYYY")} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THỜI GIAN HẸN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập thời gian hẹn " onChange={(event) => { setThoigianhen(event.target.value) }} value={moment(thoigianhen).format("HH:mm:ss")} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÌNH TRẠNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tình trạng " onChange={(event) => { setTinhtrang(event.target.value) }} value={tinhtrang} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bệnh nhân " onChange={(event) => { setBenhnhan(event.target.value) }} value={benhnhan} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BÁC SĨ PHỤ TRÁCH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id bác sĩ phụ trách " onChange={(event) => { setBacsi(event.target.value) }} value={bacsi} style={{width: "100%"}} disabled/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleDeleteLH}>XÓA</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupDeleteSchedule;

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
    background-color: var( --btn-color-2);
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
