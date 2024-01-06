import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteCTDonThuoc } from "../../../api/donthuoc/donthuoc";

const PopupDeleteDetail = ({ handleClosePopup, data, selectedItem, IDDONTHUOC }) => {
  const navigate = useNavigate();
  const dataCTDT = data?.find((item) => item?.IDTHUOC === selectedItem?.IDTHUOC);
  console.log(data, selectedItem);

  async function handleDeleteCTDT(e) {
    e.preventDefault();
    // KIỂM TRA ĐIỀU KIỆN
    const a = await deleteCTDonThuoc(IDDONTHUOC, dataCTDT?.IDTHUOC);
    console.log(a);
    if (a?.data?.isSuccess) {
      alert("XÓA CT ĐƠN THUỐC THÀNH CÔNG");
      navigate(`/prescription/prescription-detail`);
    }
    else {
      alert("XÓA CT ĐƠN THUỐC THẤT BẠI");
    }
    handleClosePopup();
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">BẠN CÓ CHẮC MUỐN XÓA ĐƠN THUỐC?</div>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleDeleteCTDT}>XÓA</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupDeleteDetail;

const PopupWrapper = styled.div`
  position: fixed;
  top: 30%;
  left: 22%;
  right: 22%;
  bottom: 30%;
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
