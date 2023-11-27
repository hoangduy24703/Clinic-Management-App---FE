import styled from "styled-components";
import { useEffect, useState } from "react";
import { SliderItems } from "./sliderItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderCategory = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 8
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

  return (
    <SliderContainer>
        <Slider {...settings} className="slider-wrapper">
          {SliderItems.map((item) => {
            return (
              <div className="slider-item">
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
  height: 210px;
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
