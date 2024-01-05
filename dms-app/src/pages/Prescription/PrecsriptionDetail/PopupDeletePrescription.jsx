import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteDonThuoc } from "../../../api/donthuoc/donthuoc";

const PopupDeletePrescription = ({ handleClosePopup, data, selectedItem }) => {
  const navigate = useNavigate();
  console.log(data, selectedItem);
  const dataDT = data?.find((item) => item?.IDDONTHUOC === selectedItem);
  const [iddonthuoc, setIddonthuoc] = useState(dataDT?.IDDONTHUOC);
  const [ngaycap, setNgaycap] = useState(moment(dataDT?.NGAYCAP).format("DD/MM/YYYY"));
  const [idbuoidieutri, setIdbuoidieutri] = useState(dataDT?.IDBUOIDIEUTRI);
  const [gia, setGia] = useState(dataDT?.GIA);

  async function handleDeleteDT(e) {
    e.preventDefault();
    if (!iddonthuoc || !ngaycap || !idbuoidieutri ) {
      alert("THIẾU TRƯỜNG THÔNG TIN");
      return;
    }
    // KIỂM TRA ĐIỀU KIỆN
    const a = await deleteDonThuoc(iddonthuoc);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("XÓA ĐƠN THUỐC THÀNH CÔNG");
      navigate(`/prescription`);
    }
    else {
      alert("XÓA ĐƠN THUỐC THẤT BẠI");
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
        <div className="popup-title">BẠN CÓ CHẮC MUỐN XÓA ĐƠN THUỐC?</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID ĐƠN THUỐC</Form.Label>
          <Form.Control type="text" placeholder="  " value={iddonthuoc} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>NGÀY CẤP</Form.Label>
          <Form.Control type="text" placeholder="  " value={ngaycap} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>ID BUỔI ĐIỀU TRỊ</Form.Label>
          <Form.Control type="text" placeholder="  " value={idbuoidieutri} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{ width: "300px", fontWeight: "700" }}>GIÁ</Form.Label>
          <Form.Control type="text" placeholder="  " value={gia} style={{ width: "100%" }} disabled/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleDeleteDT}>XÓA</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupDeletePrescription;

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
