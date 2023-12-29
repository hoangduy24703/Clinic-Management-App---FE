import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import PopupFormKHDT from "../PopupFormTreatment/PopupFormKHDT";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import PopupFormBDT from "../PopupFormTreatment/PopupFormBDT";
import { useSelector } from "react-redux";
// import PopupFormBDTDate from "../ByDate/PopupFormBDTDate";

const content = [
  {
    name: "",
    title: "Tìm kiếm BĐT từ ngày A đến ngày B"
  },
  {
    name: "",
    title: "Tìm kiếm BĐT theo bệnh nhân"
  },
  {
    name: "",
    title: "Tìm kiếm KHĐT theo bệnh nhân"
  },
  {
    name: "",
    title: "Tạo mới kế hoạch"
  },
  {
    name: "",
    title: "Tạo mới buổi điều trị"
  },
]

const TreatmentPlan = () => {
  const navigate = useNavigate();
  const [isOpenPopupFormKHDT, setIsOpenPopupFormKHDT] = useState(false);
  const [isOpenPopupFormBDT, setIsOpenPopupFormBDT] = useState(false);
  const role = useSelector(state => state.auth.role);

  const handleNavigate = (key) => {
    switch (key) {
      case 0:
        navigate("/treatment-plan/by-date");
        break;
      case 1:
        navigate("/treatment-plan/by-patient");
        break;
      case 2:
        navigate("/treatment-plan/KHDT-by-patient");
        break;
      case 3:
        if (role === `"NS"`)
          setIsOpenPopupFormKHDT(true);
        break;
      case 4:
        setIsOpenPopupFormBDT(true);
        break;
      default:
    }
  }

  const handleClosePopup = () => {
    setIsOpenPopupFormKHDT(false);
    setIsOpenPopupFormBDT(false);
  }

  const btnStyle = {
    boxShadow: "4px 4px 2px black",
    color: "black",
    padding: "10px",
    margin: "3vh"
  }
  
  return (<Fragment>
    <SliderCategory />
    {isOpenPopupFormKHDT && <PopupFormKHDT handleClosePopup={handleClosePopup}/>}
    {isOpenPopupFormBDT && <PopupFormBDT handleClosePopup={handleClosePopup}/>}
    <TreatmentPlanBody>
      {content.map((item, index) => {
        return <Button content={item} bgColor={"var(--bg-grey-color)"} style={btnStyle} key={index} onClick={() => handleNavigate(index)} />
      })}
    </TreatmentPlanBody>
  </Fragment>);
}

export default TreatmentPlan;

export const TreatmentPlanBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`
