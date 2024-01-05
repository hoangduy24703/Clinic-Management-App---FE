import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
// import Button from "../../../components/Button/Button";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import { postCapNhatHoSoBenhNhan } from "../../../api/patient/patient";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const PopupFormUpdate = ({patientData, handleClosePopup}) => {
  const id = patientData?.data?.data[0]?.IDBENHNHAN;
  const TENBN = patientData?.data?.data[0]?.TENBN;
  const GIOITINH = patientData?.data?.data[0]?.GIOITINHBN;
  const [phongkham, setPhongkham] = useState(patientData?.data?.data[0]?.IDPHONGKHAM);
  const [bornYear, setBornYear] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(patientData?.data?.data[0]?.SODIENTHOAIBN);
  const [email, setEmail] = useState(patientData?.data?.data[0]?.EMAIL);
  const [address, setAddress] = useState(patientData?.data?.data[0]?.DIACHI);
  const [status, setStatus] = useState(patientData?.data?.data[0]?.TINHTRANGDIUNG);
  const [overview, setOverview] = useState(patientData?.data?.data[0]?.TTTONGQUAN);
  const [contraindicatedDrugs, setContraindicatedDrugs] = useState(patientData?.data?.data[0]?.THUOCCHONGCHIDINH);
  const [password, setPassword] = useState(patientData?.data?.data[0]?.MATKHAU);
  const [bacsimd, setBacsimd] = useState(patientData?.data?.data[0]?.BACSIMD);
  const navigate = useNavigate();

  async function updateInforPatient(e) {
    e.preventDefault();
    if (!TENBN || !id || !phongkham || !bornYear || !phoneNumber) {
      alert("THÔNG TIN BỆNH NHÂN CÒN THIẾU");
      return;
    }
    const a = await postCapNhatHoSoBenhNhan(id, TENBN, phongkham, moment(bornYear).format("YYYY-MM-DD"), GIOITINH, phoneNumber, email, address, password, bacsimd, overview, status, contraindicatedDrugs);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("CẬP NHẬT HỒ SƠ BỆNH NHÂN THÀNH CÔNG");
      navigate("/dashboard");
      handleClosePopup();
      return;
    }
    else {
      alert("CẬP NHẬT THẤT BẠI");
    }
    handleClosePopup();
  }

  useEffect(() => {
    console.log(bornYear);
  }, [bornYear])
  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI HỒ SƠ BỆNH NHÂN</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>HỌ VÀ TÊN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên bệnh nhân " value={patientData?.data?.data[0]?.TENBN} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>PHÒNG KHÁM</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ID phòng khám " onChange={(event) => { setPhongkham(event.target.value) }} value={phongkham} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle} >
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GIỚI TÍNH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập giới tính " value={patientData?.data?.data[0]?.GIOITINHBN} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ĐỊA CHỈ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập địa chỉ " onChange={(event) => { setAddress(event.target.value) }} value={address} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>SĐT</Form.Label>
          <Form.Control type="text" placeholder=" Nhập số điện thoại " onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NĂM SINH</Form.Label>
          <CustomDatePicker
            selected={bornYear}
            onChange={(date) => setBornYear(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÌNH TRẠNG DỊ ỨNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tình trạng dị ứng" onChange={(event) => { setStatus(event.target.value) }} value={status} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THÔNG TIN TỔNG QUAN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập thông tin sức khỏe tổng quan " onChange={(event) => { setOverview(event.target.value) }} value={overview} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THUỐC CHỐNG CHỈ ĐỊNH</Form.Label>
          <Form.Control type="text" placeholder=" Thông tin chống chỉ định " onChange={(event) => { setContraindicatedDrugs(event.target.value) }} value={contraindicatedDrugs} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>EMAIL</Form.Label>
          <Form.Control type="text" placeholder=" Nhập email " onChange={(event) => { setEmail(event.target.value) }} value={email} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>PASSWORD</Form.Label>
          <Form.Control type="password" placeholder=" Nhập mật khẩu " onChange={(event) => { setPassword(event.target.value) }} value={password} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BÁC SĨ MẶC ĐỊNH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập bác sĩ mặc định " onChange={(event) => { setBacsimd(event.target.value) }} value={bacsimd} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={updateInforPatient}>CẬP NHẬT</Button>
        </ButtonGroup> 
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormUpdate;

const PopupWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 22%;
  right: 22%;
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
