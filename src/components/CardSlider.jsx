import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next pr-14 flex"
      style={{ color: "#000" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev pl-10 z-10 flex"
      style={{ color: "#000" }}
      onClick={onClick}
    />
  );
}

const CardSlider= ({ image }) => {

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="mt-5">
      <Slider className="w-[100%]" {...settings}>
        {image &&
          image?.map((img) => (
            <div key={img?._id} className="flex items-center rounded-lg">
              {img?.photo ? (
                <img
                  className="w-full h-44 rounded-lg"
                  src={img?.photo}
                  alt={img?._id}
                />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
