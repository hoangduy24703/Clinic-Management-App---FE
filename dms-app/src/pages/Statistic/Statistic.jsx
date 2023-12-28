import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SliderCategory from "../../components/Slider/SliderCategory";
import Button from "../../components/Button/Button";

const content = [
  {
    name: "",
    title: "Xem hóa báo cáo điều trị"
  },
  {
    name: "",
    title: "Xem báo cáo lịch hẹn"
  },
]

const Statistic = () => {
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    switch (key) {
      case 0:
        navigate("/statistic/statistic-treatment");
        break;
      case 1:
        navigate("/statistic/statistic-appointment-schedule");
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
    <StatisticBody>
      {content.map((item, index) => {
        return <Button content={item} bgColor={"var(--bg-grey-color)"} style={btnStyle} key={index} onClick={() => handleNavigate(index)} />
      })}
    </StatisticBody>
  </>);
}

export default Statistic;

export const StatisticBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${content.length - 2}, 400px);
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`