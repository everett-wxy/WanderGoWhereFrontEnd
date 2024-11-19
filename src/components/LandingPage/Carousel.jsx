import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./LandingPage.module.css";

const Carousel = () => {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const imagestray = [
    {
      url: "https://cdn.midjourney.com/84b73cc6-b31d-4ba3-82f6-ca1bfbc3608f/0_2.png",
      title: "Norway, Tromso",
    },
    {
      url: "https://cdn.midjourney.com/9f50d26d-42ee-41b4-b934-12225f98843a/0_3.png",
      title: "Japan, Sapporo",
    },
    {
      url: "https://cdn.midjourney.com/aba2e0b3-2bcb-4e4e-b928-eb0499dde040/0_3.png",
      title: "Egypt, Cairo",
    },
    {
      url: "https://cdn.midjourney.com/8867e8d0-d6fc-4aa7-9449-45a344173e45/0_3.png",
      title: "Turkey, Istanbul",
    },
    {
      url: "https://cdn.midjourney.com/c548e6d4-e23b-46b8-bb04-f76c8f0648cd/0_2.png",
      title: "New Zealand, Christchurch",
    },
  ];

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
        {imagestray.map((image) => {
          return (
            <div>
              <h3
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  color: "white",
                }}
              >
                {image.title}
              </h3>
              <img src={image.url} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
