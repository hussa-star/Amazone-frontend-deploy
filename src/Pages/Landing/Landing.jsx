import React from "react";
import ImageCarousel from "../../Components/carousel/Carousel";
import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";
import Layout from "../../Components/LayOut/Layout";

function Landing() {
  return (
    <Layout>
      <ImageCarousel />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;
