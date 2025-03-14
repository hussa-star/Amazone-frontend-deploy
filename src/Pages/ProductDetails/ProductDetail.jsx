import React, { useState, useEffect } from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/LayOut/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import {productUrl}  from "../../Api/endpoints"
function ProductDetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    async function feching() {
      try {
        const response = await axios.get(
          `${productUrl}/products/${productId}`
        );
        // console.log(response.data);
        setproduct(response.data);
        setisLoading(false);
      } catch (error) {
        console.log("fettching error", error);
        setisLoading(false);
      }
    }
    feching();
  }, [productId]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Products</h1>

          <div className={classes.prodctDetail}>
            <ProductCard
              data={product}
              flex={true}
              desc={true}
              cardButtonRender={true}
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default ProductDetail;
