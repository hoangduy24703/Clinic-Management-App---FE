import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { addDonThuoc } from "../../../api/donthuoc/donthuoc";
import DatePicker from "react-datepicker";

export default function PopupCreatePrescriptionDetail({setIsOpenPopupCreateChiTiet, ngaycap, idbuoidieutri, handleCloseDonThuoc}) {
  const [idthuoc, setIdthuoc] = useState('');
  const [soluong, setSoluong] = useState('');
  const [obj, setObj] = useState({});

  async function handleAddDonThuoc(e) {
    e.preventDefault();
    setObj({
      donthuoc: {
        ngaycap: ngaycap,
        idbuoidieutri: idbuoidieutri
      },
      chitietdonthuoc: {
        idthuoc: idthuoc,
        soluong: soluong,
      }
    })
    const a = await addDonThuoc(obj);
    setIsOpenPopupCreateChiTiet(false);
    handleCloseDonThuoc();
    if (a) 
      alert("THÊM ĐƠN THUỐC THÀNH CÔNG");
    else 
      alert("THÊM ĐƠN THUỐC THẤT BẠI");
  }

  const handleClosePopup = () => {
    setIsOpenPopupCreateChiTiet(false);
  }

  useEffect(() => {
    console.log(obj);
  }, [obj]);

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return <>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI ĐƠN THUỐC</div>
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
          <Button className="btn-create" onClick={handleAddDonThuoc}> TẠO </Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>
}

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
