import React from "react";
import { images } from "./image/data"; 
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import classes from "./Caraousel.module.css"
function ImageCarousel() {
  return (
    <div className={classes.carousel}>
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
        {images?.map((item, index) => (
          <div key={index}>
            <img src={item} alt="carousel item" />
          </div>
        ))}
      </Carousel>
      <div className={classes.carousel_gradiant}></div>
    </div>
  );
}

export default ImageCarousel;
