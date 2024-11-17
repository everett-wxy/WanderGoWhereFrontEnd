import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./LandingPage.module.css";

const Carousel = () => {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  var settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current) => {
      setActiveSlide2(current);
    },
  };
  return (
    <div className={styles.carouselcontainer}>
      <Slider {...settings}>
        <div>
          <img src="https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_0.png" />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/08a35899-9344-4d6a-aeea-cccb15480017/0_1.png" />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/08a35899-9344-4d6a-aeea-cccb15480017/0_1.png" />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/08a35899-9344-4d6a-aeea-cccb15480017/0_1.png" />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/08a35899-9344-4d6a-aeea-cccb15480017/0_1.png" />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/08a35899-9344-4d6a-aeea-cccb15480017/0_1.png" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
