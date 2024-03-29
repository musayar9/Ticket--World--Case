import React, { useMemo, memo, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import images from "../assets/activity.avif";
import { BiMinus } from "react-icons/bi";
import { SiGooglemaps } from "react-icons/si";
import { PiConfettiBold } from "react-icons/pi";
import { AiFillTags } from "react-icons/ai";
import { Link } from "react-router-dom";
import LazyLoadImage from "./LazyLoadImage";
import { SiteContext } from "../context/SiteContext";
import { dateLongFormat } from "./Functions";

const HeaderSlider = () => {
  const { concertData } = useContext(SiteContext);
  const shuffledData = useMemo(() => {
    return [...concertData].sort(() => Math.random() - 0.5);
  });
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    // fade:true
  };
  console.log("images", images);
  return (
    <div className="z-10 mt-20">
      <Slider {...settings}>
        {shuffledData.slice(0, 10).map((slide) => (
          <div className="w-full group z-20  " key={slide._id}>
            <div className="  w-full relative ">
              <img
                className="h-[250px] sm:h-[360px] md:h-[420px]  w-full  bg-no-repeat bg-cover object-center  relative  filter brightness-100 "
                src={images}
              />

              <div className="absolute top-10 md:top-5 left-2 sm:left-5  p-4 z-20 grid grid-cols-12 flex-col sm:flex-row justify-center ">
                <div className="col-span-3  relative">
                  <LazyLoadImage
                    className="rounded-lg h-44 w-42 sm:h-56 sm:w-56 md:h-80 md:w-64 z-20"
                    src={slide.image[0].photo}
                    alt={slide.title}
                    title={slide.title}
                  />
                </div>

                <div className="col-span-8  space-y-1 pl-4 sm:pl-8 z-20">
                  <div className="absolute  bottom-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white group-hover:mb-1 duration-500">
                      {slide.artist}
                    </h3>
                    <div className="flex items-start md:items-center justify-start group flex-col  md:flex-row space-x-0 md:space-x-4">
                      <h4 className="text-sm sm:text-lg md:text-xl text-gray-50 font-semibold ">
                        {slide.title}
                      </h4>
                      <BiMinus className="text-gray-50 hidden md:flex" />
                      <p className="text-sm sm:text-lg md:text-xl  italic semibold text-gray-50 font-semibold">
                        ( {dateLongFormat(slide.date)})
                      </p>
                    </div>
                    <div className="text-gray-50 flex mt-2  items-center justify-start group-hover:mb-2 duration-500">
                      <SiGooglemaps className="text-red-600  " />
                      <p className=" pl-2 text-yellow-400 text-sm sm:text-md md:text-lg ">
                        {slide?.locationName} / {slide?.city}
                      </p>
                    </div>
                    <div className="flex items-center capitalize  group-hover:mb-2 duration-500">
                      <AiFillTags className="text-green-500" />{" "}
                      <p className="text-sm sm:text-md md:text-lg  text-gray-300 font-semibold pl-2">
                        {slide.category}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-md font-semibold underline italic text-gray-50 ">
                        Activity Detail
                      </p>
                      <p className="text-sm italic text-gray-50 line-clamp-3 mt-1 ">
                        {slide.description}
                      </p>
                    </div>

                    <div className="cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 mb-2 group-hover:mb-5 sm:group-hover:mb-10 lg:group-hover:mb-15  duration-500">
                      <div className="  group-hover:text-[#BC1A45]">
                        <Link
                          to={`/concert/${slide._id}`}
                          className="text-gray-100 flex items-start justify-start uppercase text-xs sm:text-sm md:text-md lg:text-lg hover:text-[#BC1A45] duration-500 ease-out"
                        >
                          Detail Activity{" "}
                          <PiConfettiBold className="pl-2" size={26} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(HeaderSlider);
