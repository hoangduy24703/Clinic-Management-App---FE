import styled from "styled-components";
import { useEffect, useState } from "react";
import { SliderItems1, SliderItems2 } from "./sliderItem";
import { useNavigate, useHistory } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setClickLogout } from "../../redux/slice/authSlice";
import PopupFormSchedule from "../../pages/Patient/PopupForm/PopupFormSchedule";

const SliderCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const id = useSelector(state => state.auth.id);
  const [isOpenPopupFormSchedule, setIsOpenPopupFormSchedule] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 10,
  };

  function handleSelectPage(key) {
    if (role !== `"BN"`) {
      switch (key) {
        case 0:
          navigate("/dashboard");
          break;
        case 1:
          if (role === `"NS"` || role === `"QT"`)
            navigate("/patient-records");
          break;
        case 2:
          navigate("/treatment-plan");
          break;
        case 3:
          navigate("/appointment-schedule");
          break;
        case 4:
          navigate("/work-schedule/by-date");
          break;
        case 5:
          if (role === `"QT"` || role === `"NV"`)
            navigate("/prescription");
          break;
        case 6:
          if (role === `"QT"` || role === `"NV"`)
            navigate("/bills");
          break;
        case 7:
          if (role === `"QT"`)
            navigate("/statistic");
          break;
        case 8:
          if (role === `"QT"`)
            navigate("/staff");
          break;
        case 9:
          dispatch(setIsLogin(false));
          localStorage.setItem("isLogin", JSON.stringify(false));
          localStorage.setItem("role", JSON.stringify(null));
          localStorage.setItem("id", JSON.stringify(null));
          dispatch(setClickLogout(true));
          break;
        default:
      }
    }
    else {
      switch (key) {
        case 0:
          navigate("/dashboard");
          break;
        case 1:
          navigate(`/patient-records/${id}`);
          break;
        case 2:
          setIsOpenPopupFormSchedule(true);
          break;
        case 3:
          dispatch(setIsLogin(false));
          localStorage.setItem("isLogin", JSON.stringify(false));
          localStorage.setItem("role", JSON.stringify(null));
          localStorage.setItem("id", JSON.stringify(null));
          dispatch(setClickLogout(true));
          break;
        default:
      }
    }
  }

  return (
    <SliderContainer>
      {isOpenPopupFormSchedule && <PopupFormSchedule idbenhnhan={id} handleClosePopup={() => setIsOpenPopupFormSchedule(false)}/>}
      {(role === `"NS"` || role === `"NV"` || role === `"QT"`) && 
      <Slider {...settings} className="slider-wrapper">
        {SliderItems1.map((item, index) => {
          return (
            <div className="slider-item" onClick={() => handleSelectPage(index)} key={index}>
              <img src={item.iconSlider} alt="" />
              <div>{item.nameSlider}</div>
            </div>
          );
        })}
      </Slider>}
      {role === `"BN"` && 
      <Slider {...settings} className="slider-wrapper">
        {SliderItems2.map((item, index) => {
          return (
            <div className="slider-item" onClick={() => handleSelectPage(index)} key={index}>
              <img src={item.iconSlider} alt="" />
              <div>{item.nameSlider}</div>
            </div>
          );
        })}
      </Slider>}
    </SliderContainer>
  );
}

export default SliderCategory;

const SliderContainer = styled.div`
  height: 150px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  
  .slick-slide > div {
    margin: 0 10px;
    width: 140px;
  }

  .slick-list {
    margin: 0 10px;
  }

  .slider-wrapper {
    background-color: var(--bg-blue-color);
    padding: 10px;
    text-align: center;
  }

  .slider-item {
    transform: scale(0.9);
    padding-top: 15%;
    background-color: var(--bg-grey-color);
    border-radius: 15px;
    aspect-ratio: 5/4;
    font-weight: 700;
    font-size: 14px;

    img {
      width: 40px;
      height: 40px;
      margin: 0 auto;
      margin-bottom: 5px;
    }

    &:hover {
      transform: scale(1);
      border: 2px solid var(--primary-color);
    }
  }
`
