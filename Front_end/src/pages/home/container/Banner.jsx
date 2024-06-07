import React from "react";
import { images } from "../../../constants";
import { IoIosSearch } from "react-icons/io";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ArticlesCard from "../../../components/ArticlesCard";
import { ImgBanner } from "./ImgBanner";
// import { images } from "../../../constants";

const Banner = () => {
  const options = {
    autoplay: true,
    responsiveClass: true,
    dots: false,
    // nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <section className="relative top-0 container px-5 py-5 m-auto flex z-[10] rounded-lg">
      <div className="w-full ">
        <OwlCarousel
          {...options}
          className="owl-theme mx-auto rounded-lg"
          loop
          margin={15}
          items={4}
        >
          <ImgBanner titleImg={images.banner1} />

          <ImgBanner titleImg={images.banner2} />

          <ImgBanner titleImg={images.banner3} />
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Banner;
