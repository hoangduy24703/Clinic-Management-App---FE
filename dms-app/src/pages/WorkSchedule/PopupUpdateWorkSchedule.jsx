import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { postCapNhatLichLamViec } from "../../api/lichlamviec/lichlamviec";

const PopupUpdateWorkSchedule = ({ handleClosePopup, data, selectedItem }) => {
  const navigate = useNavigate();
  console.log(data, selectedItem);
  const dataLLV = data?.find((item) => item?.IDNHANVIEN === selectedItem?.IDNHANVIEN && item?.IDCALAM === selectedItem?.IDCALAM && item?.NGAY === selectedItem?.NGAY && item?.THANG === selectedItem?.THANG && item?.NAM === selectedItem?.NAM)
  const [idnhanvien, setIDNhanVien] = useState(dataLLV?.IDNHANVIEN);
  const [ngay, setNgay] = useState(moment(dataLLV?.NAM + "-" + dataLLV?.THANG + "-" + dataLLV?.NGAY));
  const [idcalam, setIDCaLam] = useState(dataLLV?.IDCALAM);
  const [ngay_new, setNgayNew] = useState(null);
  const [idcalam_new, setIDCaLamNew] = useState(null);

  async function handleUpdateLLV(e) {
    e.preventDefault();
    if (!idnhanvien || !ngay || !idcalam || !ngay_new || !idcalam_new) {
      alert("THIẾU TRƯỜNG THÔNG TIN");
      return;
    }
    // KIỂM TRA ĐIỀU KIỆN
    const a = await postCapNhatLichLamViec(idnhanvien, moment(ngay).format("YYYY-MM-DD"), idcalam, moment(ngay_new).format("YYYY-MM-DD"), idcalam_new);
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
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>NGÀY CŨ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " value={moment(ngay).format("DD/MM/YYYY")} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID CA LÀM CŨ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID Nhân Viên " value={idcalam} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>NGÀY MỚI</Form.Label>
          <CustomDatePicker
            selected={ngay_new}
            onChange={(date) => setNgayNew(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID CA LÀM MỚI</Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setIDCaLamNew(e.target.value)} >
            <option>Chọn ca làm </option>
            <option value="C1" > Ca 1 </option>
            <option value="C2" > Ca 2 </option>
            <option value="C3" > Ca 3 </option>
            <option value="C4" > Ca 4 </option>
          </Form.Select>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleUpdateLLV}>CẬP NHẬT</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupUpdateWorkSchedule;

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
