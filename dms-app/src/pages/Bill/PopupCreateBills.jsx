import { useState, useEffect } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHoaDon } from "../../api/hoadon/hoadon";

const PopupFormCreateBill = ({handleClosePopup}) => {
  const [loaithanhtoan, setLoaithanhtoan] = useState('');
  const [ghichuhoadon, setGhichuhoadon] = useState(null);
  const [ngaygiaodich, setNgaygiaodich] = useState('');
  const [idbenhnhan, setIdbenhnhan] = useState('');
  const [idbuoidieutri, setIdbuoidieutri] = useState('');

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  async function handleAddHoaDon(e) {
    // KIỂM TRA ĐIỀU KIỆN
    e.preventDefault();
    if (!loaithanhtoan || !ngaygiaodich || !idbenhnhan || !idbuoidieutri) {
      alert("CHƯA ĐIỀN ĐẦY ĐỦ THÔNG TIN");
      return;
    }
    console.log(loaithanhtoan, ghichuhoadon, ngaygiaodich, idbenhnhan, idbuoidieutri);
    const a = await addHoaDon(loaithanhtoan, ghichuhoadon, ngaygiaodich, idbenhnhan, idbuoidieutri);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("TẠO HÓA ĐƠN THÀNH CÔNG");
    }
    else {
      alert("TẠO HÓA ĐƠN THẤT BẠI");
    }
  }
  useEffect(() => {
    console.log(loaithanhtoan, ghichuhoadon, ngaygiaodich, idbenhnhan, idbuoidieutri);
  }, [])
  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI HÓA ĐƠN</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BUỔI ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id buổi điều trị " onChange={(event) => { setIdbuoidieutri(event.target.value) }} value={idbuoidieutri} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bệnh nhân " onChange={(event) => { setIdbenhnhan(event.target.value) }} value={idbenhnhan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GHI CHÚ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ghi chú " onChange={(event) => { setGhichuhoadon(event.target.value) }} value={ghichuhoadon} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>NGÀY GIAO DỊCH</Form.Label>
          <CustomDatePicker
            selected={ngaygiaodich}
            onChange={(date) => setNgaygiaodich(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText=" Chọn ngày"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
            <Form.Label style={{width: "300px", fontWeight: "700"}}>LOẠI THANH TOÁN</Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setLoaithanhtoan(e.target.value)} >
                <option>Loại thanh toán</option>
                <option value="TIỀN MẶT"> Tiền mặt </option>
                <option value="ONLINE" > Online </option>
            </Form.Select>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddHoaDon}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormCreateBill;

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