import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addChiTietDonThuoc } from "../../../api/donthuoc/donthuoc";
import DatePicker from "react-datepicker";
import moment from "moment";

const CreateCTDonThuoc = ({handleClosePopup, iddonthuoc}) => {  
  const [idthuoc, setIdthuoc] = useState(null); 
  const [soluong, setSoluong] = useState(0);

  async function createCTDT(e) {
    e.preventDefault();
    if (!iddonthuoc || !idthuoc) {
      alert("THIẾU TRƯỜNG THÔNG TIN");
      return;
    }

    const a = await addChiTietDonThuoc(idthuoc, iddonthuoc, Number(soluong))
    if (a?.data?.isSuccess ) {
        alert("TẠO CHI TIẾT ĐƠN THUỐC THÀNH CÔNG");
        handleClosePopup();
        return;
    }
    else {
        alert("TẠO CHI TIẾT ĐƠN THUỐC THẤT BẠI");
        handleClosePopup();
        return;
    }
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
          <Form.Control type="text" placeholder=" " value={iddonthuoc} style={{width: "100%"}} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID THUỐC</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id thuốc " onChange={(event) => { setIdthuoc(event.target.value) }} value={idthuoc} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>SỐ LƯỢNG</Form.Label>
          <Form.Control type="text" placeholder=" Nhập số lượng " onChange={(event) => { setSoluong(event.target.value) }} value={Number(soluong)} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={createCTDT}> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default CreateCTDonThuoc;

const PopupWrapper = styled.div`
  position: fixed;
  top: 15%;
  left: 22%;
  right: 22%;
  bottom: 40%;
  width: auto;
  height: auto;
  z-index: 3;
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
