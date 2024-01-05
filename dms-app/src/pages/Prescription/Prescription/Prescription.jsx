import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import PopupFormBDTDate from "../ByDate/PopupFormBDTDate";

const content = [
  {
    name: "",
    title: "Thuốc"
  },
  {
    name: "",
    title: "Đơn thuốc"
  },
]

const Prescription = () => {
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    switch (key) {
      case 0:
        navigate("/prescription/medicine");
        break;
      case 1:
        navigate("/prescription/prescription-detail");
        break;
      default:
    }
  }

  const btnStyle = {
    boxShadow: "4px 4px 2px black",
    color: "black",
    padding: "10px",
    margin: "3vh"
  }
  
  return (<>
    <SliderCategory />
    <PrescriptionBody>
      {content.map((item, index) => {
        return <Button content={item} bgColor={"var(--bg-grey-color)"} style={btnStyle} key={index} onClick={() => handleNavigate(index)} />
      })}
      
    </PrescriptionBody>
  </>);
}

export default Prescription;

export const PrescriptionBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`