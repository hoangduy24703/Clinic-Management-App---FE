import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { addDonThuoc } from "../../../api/donthuoc/donthuoc";
import DatePicker from "react-datepicker";

export default function PopupCreatePrescriptionDetail({setIsOpenPopupCreateChiTiet, ngaycap, idbuoidieutri, handleCloseDonThuoc}) {
  const [idthuoc, setIdthuoc] = useState('');
  const [soluong, setSoluong] = useState('');
  const [ctt, setCtt] = useState([]);

  function handleAddThuoc(e) {
    e.preventDefault();
    setCtt([...ctt, 
      {
        idthuoc: idthuoc,
        soluong: Number(soluong)
    }]);
    setIdthuoc("");
    setSoluong(0);
  }
  async function handleAddDonThuoc(e) {
    e.preventDefault();
    const a = await addDonThuoc({
      donthuoc: {
        ngaycap: ngaycap,
        idbuoidieutri: idbuoidieutri
      },
      chitietdonthuoc: [
        ...ctt
      ]
    });
    setIsOpenPopupCreateChiTiet(false);
    handleCloseDonThuoc();
    if (a?.data?.isSuccess) 
      alert("THÊM ĐƠN THUỐC THÀNH CÔNG");
    else 
      alert("THÊM ĐƠN THUỐC THẤT BẠI");
  }

  const handleClosePopup = () => {
    setIsOpenPopupCreateChiTiet(false);
  }

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
          <div style={{overflowY: "scroll", height: "250px", paddingTop: "5px"}}>
          {ctt?.map((item, index) => {
            return <>
              <h4>Thuốc {index + 1}</h4>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
                <Form.Label style={{width: "300px", fontWeight: "700"}}>ID THUỐC</Form.Label>
                <Form.Control type="text" value={item.idthuoc} style={{width: "100%"}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
                <Form.Label style={{width: "300px", fontWeight: "700"}}>SỐ LƯỢNG</Form.Label>
                <Form.Control type="text" value={item.soluong} style={{width: "100%"}}/>
              </Form.Group>
            </>
          })}
        </div>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-add" onClick={handleAddThuoc}>THÊM CHI TIẾT THUỐC</Button>
          <Button className="btn-create" onClick={handleAddDonThuoc}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 15%;
  left: 22%;
  right: 22%;
  bottom: 10%;
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
  .btn-add {
    font-weight: 700;
    background-color: var(--bg-blue-color);
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
