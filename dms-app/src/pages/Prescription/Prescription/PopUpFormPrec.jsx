import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addLoaiThuoc } from "../../../api/donthuoc/donthuoc";

const PopupFormMed = ({handleClosePopup}) => {
  const [tenthuoc, setTenThuoc] = useState('');
  const [thanhphan, setThanhPhan] = useState('') ;
  const [donvitinh, setDonViTinh] = useState('');
  const [giathuoc, setGiaThuoc] = useState('')
//   const [ghichu, setGhichu] = useState('');
//   const [ngay, setNgay] = useState(null);
//   const [khamchinh, setKhamchinh] = useState('');
//   const [trokham, setTrokham] = useState('');
//   const [kehoach, setKehoach] = useState('');
// const App =()=> {
//     const options =[
//         { value: "ml", label :"ml"},
//         { value: "g", label :"g"},
//         { value: "ống" , label :"ống"},
//         { value: "viên" , label :"viên"},
//     ]
// }
  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }
//   const handleChangeDVT = (selectedOption) => {
//     setDonVi(selectedOption);
//     console.log(`Option selected:`, selectedOption);
//   };
  async function handleAddThuoc(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    await addLoaiThuoc("DC100000", tenthuoc, thanhphan, donvitinh, giathuoc)
    // alert("THÊM THUỐC THÀNH CÔNG");
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI BUỔI ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÊN THUỐC</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên thuốc " onChange={(event) => { setTenThuoc(event.target.value) }} value={tenthuoc} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
            <Form.Label style={{width: "300px", fontWeight: "700"}}>ĐƠN VỊ TÍNH</Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setDonViTinh(e.target.value)} >
                <option>Đơn vị tính</option>
                <option value="ml" >ml</option>
                <option value="viên" >Viên</option>
                <option value="g" >g</option>
                <option value="ống" >Ống</option>
                <option value="liều" >liều</option>
                {/* <Select options={options} onChange={handleChangeDVT} autoFocus={true} /> */}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THÀNH PHẦN</Form.Label>
          <Form.Control type="text" placeholder="Thành phần" onChange={(event) => { setThanhPhan(event.target.value) }} value={thanhphan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GÍA THUỐC</Form.Label>
          <Form.Control type="text" placeholder="Gía thuốc" onChange={(event) => { setGiaThuoc(event.target.value) }} value={giathuoc} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddThuoc}><IoMdAddCircleOutline size="20px"/> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormMed;

const PopupWrapper = styled.div`
  position: absolute;
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