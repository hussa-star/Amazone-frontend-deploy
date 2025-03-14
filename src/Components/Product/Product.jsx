import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
import { productUrl } from "../../Api/endpoints";

function Product() {
  const [product, setproduct] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    async function fetching() {
      try {
        const response = await axios.get(`${productUrl}/products`);
        // console.log(response);
        setproduct(response.data);
        setisLoading(false);
      } catch (error) {
        console.log("feching error", error);
        setisLoading(false);
      }
    }

    fetching();
  }, []);

  // console.log(product);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {product?.map((item) => (
            <ProductCard key={item.id} data={item} cardButtonRender={true} />
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
