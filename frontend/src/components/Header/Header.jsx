/* eslint-disable react/no-unescaped-entities */
import "./Header.css";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Header() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false, // We manage autoplay manually via useEffect
  };

  const slides = [
    { id: 1, content: "slide-1.jpg" },
    { id: 2, content: "slide-2.jpg" },
    { id: 3, content: "slide-4.avif" },
    { id: 4, content: "slide-5.jpg" },
    { id: 5, content: "slide-6.jpg" },
  ];

  return (
    <Slider ref={sliderRef} {...settings}>
      {slides.map((slide) => (
        <>
          <div
            className="header"
            key={slide.id}
            style={{
              backgroundImage: `linear-gradient(to right bottom, rgba(130, 201, 30, 0.4), rgba(92, 148, 13, 0.4)), url(${slide.content})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          >
            <div className="header-contents">
              <h2>Order your favourite food here</h2>
              <p>
                Enjoy the convenience of ordering from the comfort of your home
                and let us handle the rest. With easy online ordering and prompt
                delivery, we're here to make your mealtime memorable.
              </p>
              <button>order now</button>
            </div>
          </div>
        </>
      ))}
    </Slider>
  );
}

export default Header;
