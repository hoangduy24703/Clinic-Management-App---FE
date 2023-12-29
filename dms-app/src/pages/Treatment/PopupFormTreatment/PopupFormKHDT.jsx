import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addKeHoach } from "../../../api/dieutri/dieutri";

const PopupFormKHDT = ({handleClosePopup}) => {
  const [mota, setMota] = useState(null) 
  const [trangthai, setTrangthai] = useState(null);
  const [ghichu, setGhichu] = useState(null);
  const [idbenhnhan, setIdbenhnhan] = useState(null);
  const [bsphutrach, setBsphutrach] = useState(null);

  async function handleAddKHDT(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    if (!trangthai || !idbenhnhan || !bsphutrach) {
      alert("CHƯA NHẬP DỮ LIỆU");
      return;
    }
    const result = await addKeHoach(mota, trangthai, ghichu, idbenhnhan, bsphutrach);
    console.log(result);
    if (result?.data?.isSuccess) 
      alert("TẠO KẾ HOẠCH ĐIỀU TRỊ THÀNH CÔNG");
    else 
      alert("TẠO KHĐT KHÔNG THÀNH CÔNG");
    handleClosePopup();
  }

  const FormGroupStyle = {
    display: "flex",
    width: "100%"
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
        <div className="popup-title">THÊM MỚI KẾ HOẠCH ĐIỀU TRỊ</div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>MÔ TẢ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập mô tả " onChange={(event) => { setMota(event.target.value) }} value={mota} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>TRẠNG THÁI</Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setTrangthai(e.target.value)} >
                <option>Chọn trạng thái</option>
                <option value="KẾ HOẠCH"> KẾ HOẠCH </option>
                <option value="ĐÃ HỦY" > ĐÃ HỦY </option>
                <option value="ĐÃ HOÀN THÀNH" > ĐÃ HOÀN THÀNH </option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>GHI CHÚ</Form.Label>
          <Form.Control type="text" placeholder=" Nhập ghi chú " onChange={(event) => { setGhichu(event.target.value) }} value={ghichu} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>ID BỆNH NHÂN</Form.Label>
          <Form.Control type="text" placeholder=" Nhập id bệnh nhân " onChange={(event) => { setIdbenhnhan(event.target.value) }} value={idbenhnhan} style={{width: "100%"}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={FormGroupStyle}>
          <Form.Label style={{width: "300px", fontWeight: "700"}}>BÁC SĨ PHỤ TRÁCH</Form.Label>
          <Form.Control type="text" placeholder=" Nhập tên id bác sĩ phụ trách " onChange={(event) => { setBsphutrach(event.target.value) }} value={bsphutrach} style={{width: "100%"}}/>
        </Form.Group>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleAddKHDT}>TẠO</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupFormKHDT;

const PopupWrapper = styled.div`
  position: absolute;
  top: 15%;
  left: 22%;
  right: 22%;
  bottom: 15%;
  z-index: 2;
  padding: 5vw;
  padding-bottom: 2vw;
  background-color: var(--bg-grey-1-color);
  border-radius: 10px;
  border: 1px solid;
  height: auto;
  width: auto;

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
    font-weight: 700;
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