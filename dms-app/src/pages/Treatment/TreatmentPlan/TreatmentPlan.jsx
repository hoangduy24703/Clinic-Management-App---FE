import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const content = [
  {
    name: "",
    title: "Tìm kiếm theo bác sĩ"
  },
  {
    name: "",
    title: "Tìm kiếm theo bệnh nhân"
  },
  {
    name: "",
    title: "Tạo mới kế hoạch"
  },
  {
    name: "",
    title: "Tạo mới buổi điều trị"
  }
]

const TreatmentPlan = () => {
  const navigate = useNavigate();
  const handleNavigate = (key) => {
    switch (key) {
      case 0:
        navigate("/treatment-plan/by-plan");
        break;
      case 1:
        navigate("/treatment-plan/by-plan");
        break;
      case 2:
        navigate("/treatment-plan/by-plan");
        break;
      case 3:
        navigate("/treatment-plan/by-plan");
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
    <TreatmentPlanBody>
      {content.map((item, index) => {
        return <Button content={item} bgColor={"var(--bg-grey-color)"} style={btnStyle} key={index} onClick={() => handleNavigate(index)} />
      })}
    </TreatmentPlanBody>
  </>);
}

export default TreatmentPlan;

const TreatmentPlanBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`
