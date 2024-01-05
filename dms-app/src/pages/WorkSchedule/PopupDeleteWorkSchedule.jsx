import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { postXoaLichLamViec } from "../../api/lichlamviec/lichlamviec";

const PopupDeleteWorkSchedule = ({ handleClosePopup, data, selectedItem }) => {
  const navigate = useNavigate();
  console.log(data, selectedItem);
  const dataLLV = data?.find((item) => item?.IDNHANVIEN === selectedItem?.IDNHANVIEN && item?.IDCALAM === selectedItem?.IDCALAM && item?.NGAY === selectedItem?.NGAY && item?.THANG === selectedItem?.THANG && item?.NAM === selectedItem?.NAM)
  const [idnhanvien, setIDNhanVien] = useState(dataLLV?.IDNHANVIEN);
  const [ngay, setNgay] = useState(moment(dataLLV?.NAM + "-" + dataLLV?.THANG + "-" + dataLLV?.NGAY).format("YYYY-MM-DD"));
  const [idcalam, setIDCaLam] = useState(dataLLV?.IDCALAM);

  async function handleDeleteLLV(e) {
    e.preventDefault();
    if (!idnhanvien || !ngay || !idcalam ) {
      alert("THIẾU TRƯỜNG THÔNG TIN");
      return;
    }
    // KIỂM TRA ĐIỀU KIỆN
    const a = await postXoaLichLamViec(idnhanvien, ngay, idcalam);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("CẬP NHẬT LỊCH LÀM VIỆC THÀNH CÔNG");
      navigate(`/appointment-schedule/by-patient`);
    }
    else {
      alert("CẬP NHẬT THẤT BẠI");
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
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">CẬP NHẬT LỊCH LÀM VIỆC</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID NHÂN VIÊN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " value={idnhanvien} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>NGÀY</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " value={moment(ngay).format("DD/MM/YYYY")} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID CA LÀM</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " value={idcalam} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleDeleteLLV}>XÓA</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupDeleteWorkSchedule;

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
