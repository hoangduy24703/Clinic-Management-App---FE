import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateLoaiThuoc } from "../../../api/donthuoc/donthuoc";
import { useNavigate } from "react-router-dom";

const PopupFormUpdateMed = ({handleClosePopup, thuoc, selectedItem, submit}) => {
  const navigate = useNavigate();
  const item = thuoc.find((i) => i.IDTHUOC === selectedItem);
  const [tenthuoc, setTenThuoc] = useState(item?.TENTHUOC);
  const [thanhphan, setThanhPhan] = useState(item?.THANHPHAN) ;
  const [donvitinh, setDonViTinh] = useState(item?.DONVITINH);
  const [giathuoc, setGiaThuoc] = useState(item?.GIATHUOC)

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  async function handleUpdateMed(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    if (!tenthuoc || !thanhphan || !donvitinh || !giathuoc) {
      alert("CHƯA NHẬP ĐẦY ĐỦ THÔNG TIN");
      return;
    }
    const a = await updateLoaiThuoc(item?.IDTHUOC , tenthuoc, thanhphan, donvitinh, giathuoc);
    if (a?.data?.isSuccess) {
      alert("SỬA THUỐC THÀNH CÔNG");
      navigate('/prescription');
    }
    else {
      alert("SỬA THUỐC THẤT BẠI");
    }
    handleClosePopup();
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={() => {handleClosePopup(false); console.log("click")}}/>
        <div className="popup-title">SỬA THUỐC</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TÊN THUỐC</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên thuốc " onChange={(event) => { setTenThuoc(event.target.value) }} value={tenthuoc} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
            <Form.Label style={{width: "300px", fontWeight: "700"}}>ĐƠN VỊ TÍNH</Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setDonViTinh(e.target.value)} >
                <option disabled>Đơn vị tính</option>
                <option value="ml" >ml</option>
                <option value="viên" >viên</option>
                <option value="g" >g</option>
                <option value="ống" >ống</option>
                <option value="liều" >liều</option>
                {/* <Select options={options} onChange={handleChangeDVT} autoFocus={true} /> */}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>THÀNH PHẦN</Form.Label>
          <Form.Control type="text" placeholder="Thành phần" onChange={(event) => { setThanhPhan(event.target.value) }} value={thanhphan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GIÁ THUỐC</Form.Label>
          <Form.Control type="text" placeholder="Giá thuốc" onChange={(event) => { setGiaThuoc(event.target.value) }} value={giathuoc} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={(e) => {e.preventDefault(); handleClosePopup()}}>HỦY</Button>
          <Button className="btn-create" onClick={handleUpdateMed}>CẬP NHẬT</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormUpdateMed;

const PopupWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 22%;
  right: 22%;
  bottom: 30%;
  z-index: 2;
  padding: 5vw;
  padding-bottom: 2vw;
  background-color: var(--bg-grey-1-color);
  border-radius: 10px;
  border: 1px solid;
  width: auto;
  height: auto;

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