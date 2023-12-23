import styled from "styled-components";
import { useEffect, useState } from "react";
import { SliderItems } from "./sliderItem";
import { useNavigate, useHistory } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../redux/slice/authSlice";

const SliderCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 10,
  };

  const getScreenSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const [screenSize, setScreenSize] = useState(getScreenSize());
  useEffect(() => {
    const handdleResize = () => {
      setScreenSize(getScreenSize());
    }

    window.addEventListener('resize', handdleResize);
    return () => {
      window.removeEventListener('resize', handdleResize);
    }
  }, [screenSize])

  function handleSelectPage(key) {
    switch(key) {
      case 0: 
        navigate("/dashboard");
        break;
      case 1:
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
        navigate("/prescription");
        break;
      case 6:
        navigate("/bills");
        break;
      case 7:
        // naviagte cho nay
        break;
      case 8:
        navigate("/staff");
        break;
      case 9:
        dispatch(setIsLogin(false));
        localStorage.setItem("isLogin", JSON.stringify(false));
        localStorage.setItem("role", JSON.stringify(null));
        break;
      default:
    }
  }

  return (
    <SliderContainer>
        <Slider {...settings} className="slider-wrapper">
          {SliderItems.map((item, index) => {
            return (
              <div className="slider-item" onClick={() => handleSelectPage(index)} key={index}>
                <img src={item.iconSlider} alt="" />
                <div>{item.nameSlider}</div>
              </div>
            );
          })}
        </Slider>
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
