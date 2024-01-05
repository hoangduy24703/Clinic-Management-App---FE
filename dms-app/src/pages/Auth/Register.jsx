import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
// import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRegister } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { postThemBenhNhan } from '../../api/patient/patient';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ten, setTen] = useState("");
  const [phongkham, setPhongkham] = useState("");
  const [namsinh, setNamsinh] = useState(null);
  const [gioitinh, setGioitinh] = useState();
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [diachi, setDiachi] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [gioitinhDisable, setGioitinhDisable] = useState(false);
  

  async function handleSubmit(e) {
    e.preventDefault();
    const bacsimd = null;
    const tttq = null;
    const ttdu = null;
    const tccd = null;
    if (!ten || !phongkham || !namsinh || !gioitinh || !sdt || !email || !diachi || !matkhau) {
      alert("THIẾU THÔNG TIN");
      return;
    }
    const a = await postThemBenhNhan(ten, phongkham, moment(namsinh).format("YYYY-MM-DD"), gioitinh, sdt, email, diachi, matkhau, bacsimd, tttq, ttdu, tccd);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("ĐĂNG KÝ THÔNG TIN THÀNH CÔNG");
      dispatch(setRegister(false));
      navigate("/");
    }
    else {
      alert("ĐĂNG KÝ THẤT BẠI");
    }
    setTen("");
    setPhongkham("");
    setNamsinh(null);
    setDiachi('');
    setSdt("");
    setEmail("");
    setMatkhau("");
  }

  return (
    <RegisterContainer>
      <Title >DENTAL MANAGEMENT SYSTEM</Title>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>HỌ VÀ TÊN</Form.Label>
            <Form.Control type="text" placeholder=" Nhập họ và tên " onChange={(event) => setTen(event.target.value)} value={ten} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>PHÒNG KHÁM</Form.Label>
            <Form.Control type="text" placeholder=" Nhập phòng khám " onChange={(event) => setPhongkham(event.target.value)} value={phongkham} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{display: "flex", flexDirection: "column"}}>
            <Form.Label>NĂM SINH</Form.Label>
            <CustomDatePicker
              selected={namsinh}
              onChange={(date) => setNamsinh(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText=" Chọn ngày"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>GIỚI TÍNH</Form.Label>
            <Form.Select onChange={e => setGioitinh(e.target.value)} >
                <option onClick={() => setGioitinhDisable(true)} disabled={gioitinhDisable ? false : true}>Chọn giới tính</option>
                <option value="NAM"> NAM </option>
                <option value="NỮ" > NỮ </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>SỐ ĐIỆN THOẠI</Form.Label>
            <Form.Control type="text" placeholder=" Nhập số điện thoại " onChange={(event) => setSdt(event.target.value)} value={sdt} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>EMAIL</Form.Label>
            <Form.Control type="text" placeholder=" Nhập email " onChange={(event) => setEmail(event.target.value)} value={email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>ĐỊA CHỈ</Form.Label>
            <Form.Control type="text" placeholder=" Nhập địa chỉ " onChange={(event) => setDiachi(event.target.value)} value={diachi} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
            <Form.Label>MẬT KHẨU</Form.Label>
            <Form.Control type="password" placeholder=" Nhập mật khẩu " onChange={(event) => setMatkhau(event.target.value)} value={matkhau} />
          </Form.Group>
          <Form.Group style={{ display: "flex" }}>
            <Button>ĐĂNG KÝ</Button>
          </Form.Group>
          <div style={{ textAlign: "center", paddingTop: "3vh", fontSize: "13px", cursor: "pointer" }} onClick={() => { dispatch(setRegister(false)); navigate("/"); }}>ĐĂNG NHẬP TÀI KHOẢN</div>
        </Form>
      </FormWrapper>
    </RegisterContainer>
  )
}

const RegisterContainer = styled.div`
`

const FormWrapper = styled.div`
  width: 700px;
  margin: 10vh auto;
  border-radius: 12px;
  background-color: var(--form-color);
  padding: 20px 80px;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 10vh;
`

const Button = styled.button`
  border: none;
  margin: 0 auto;
  border-radius: 15px;
  padding: 15px;
  background-color: var(--primary-color);
  color: white;
  font-weight: 700;
`

export default Register;

const CustomDatePicker = styled(DatePicker)`
  padding: 5px;
`
