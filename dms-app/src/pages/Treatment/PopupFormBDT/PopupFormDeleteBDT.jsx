import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteBDT } from "../../../api/dieutri/dieutri";

const PopupDeleteBDT = ({ handleClosePopup, idbuoidieutri }) => {
  const navigate = useNavigate();
  console.log(idbuoidieutri);

  async function handleDeleteCTDT(e) {
    e.preventDefault();
    const a = await deleteBDT(idbuoidieutri);
    if (a?.data?.isSuccess) {
      alert("XÓA BUỔI ĐIỀU TRỊ THÀNH CÔNG");
      navigate(`treatment-plan`);
      return;
    }
    else {
      alert("XÓA BUỔI ĐIỀU TRỊ THẤT BẠI");
      handleClosePopup();
      return;
    }
  }

  return (<>
    <PopupWrapper>
      <Form>
        <IoMdClose style={{ marginLeft: "105%", marginTop: "-20%", cursor: "pointer" }} size="30px" onClick={handleClosePopup} />
        <div className="popup-title">BẠN CÓ CHẮC MUỐN XÓA BUỔI ĐIỀU TRỊ {idbuoidieutri}?</div>
        <ButtonGroup>
          <Button className="btn-cancel" onClick={handleClosePopup}>HỦY</Button>
          <Button className="btn-create" onClick={handleDeleteCTDT}>XÓA</Button>
        </ButtonGroup>
      </Form>
    </PopupWrapper>
  </>)
}

export default PopupDeleteBDT;

const PopupWrapper = styled.div`
  position: fixed;
  top: 25%;
  left: 22%;
  right: 22%;
  bottom: 35%;
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
