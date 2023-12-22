import SliderCategory from "../../components/Slider/SliderCategory";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PopupFormCreateSchedule from "./PopupCreateSchedule";

const content = [
  {
    name: "",
    title: "Tìm kiếm theo bệnh nhân"
  },
  {
    name: "",
    title: "Tìm kiếm theo nha sĩ"
  },
  {
    name: "",
    title: "Tìm kiếm theo phòng khám"
  },
  {
    name: "",
    title: "Tìm kiếm từ ngày A đến ngày B"
  },
  {
    name: "",
    title: "Tạo mới lịch hẹn"
  },
]

const AppointmentSchedule = () => {
  const navigate = useNavigate();
  const [isOpenPopupCreateSchedule, setIsOpenCreateSchedule] = useState(false); 

  const btnStyle = {
    boxShadow: "4px 4px 2px black",
    color: "black",
    padding: "10px",
    margin: "3vh"
  }

  const handleClosePopup = () => {
    setIsOpenCreateSchedule(false);
  }

  const handleNavigate = (key) => {
    switch(key) {
      case 0:
        navigate("/appointment-schedule/by-patient");
        break;
      case 1:
        navigate("/appointment-schedule/by-doctor");
        break;
      case 2:
        navigate("/appointment-schedule/by-clinic");
        break;
      case 3: 
        navigate("/appointment-schedule/by-date");
        break;
      case 4: 
        setIsOpenCreateSchedule(true);
        break;
      default:
    }
  }

  return (<>
    <SliderCategory />
    {isOpenPopupCreateSchedule && <PopupFormCreateSchedule handleClosePopup={handleClosePopup}/>}
    <ScheduleBody>
      {content.map((item, index) => {
        return <Button content={item} bgColor={"var(--bg-grey-color)"} style={btnStyle} key={index} onClick={() => handleNavigate(index)} />
      })}
    </ScheduleBody>
  </>);
}

export default AppointmentSchedule;

const ScheduleBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`