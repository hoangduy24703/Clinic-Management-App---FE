import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SliderCategory from "../../components/Slider/SliderCategory";
import Button from "../../components/Button/Button";

const content = [
  {
    name: "",
    title: "Xem hóa đơn theo bệnh nhân"
  },
  {
    name: "",
    title: "Xem hóa đơn theo ngày"
  },
  {
    name: "",
    title: "Thêm mới hóa đơn"
  },
]

const Bills = () => {
  const navigate = useNavigate();
  const [isOpenPopupCreateBill, setIsOpenPopupCreateBill] = useState(false);

  const handleNavigate = (key) => {
    switch (key) {
      case 0:
        navigate("/bills/bills-by-patient");
        break;
      case 1:
        navigate("/bills/bills-by-date");
        break;
      case 2:
        setIsOpenPopupCreateBill(true);
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

export default Bills;

export const PrescriptionBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`