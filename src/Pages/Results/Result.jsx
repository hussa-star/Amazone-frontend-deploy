import React, { useEffect, useState } from "react";
import classes from "./Result.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import { productUrl } from "../../Api/endpoints";
function Result() {
  const [category, setcategory] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { categoryName } = useParams();
  // console.log(categoryName);
  useEffect(() => {
    async function fetching() {
      try {
        const response = await axios.get(
          `${productUrl}/products/category/${categoryName}`
        );
        console.log(response.data);
        setcategory(response.data);
        setisLoading(false);
      } catch (error) {
        console.log("fetching error", error);
        setisLoading(false);
      }
    }
    fetching();
  }, [categoryName]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.title}>
            <h1>Results</h1>
            <p>Category {categoryName}</p>
          </div>

          <div className={classes.result_product}>
            {category?.map((item) => (
              <ProductCard
                key={item.id}
                data={item}
                disc={false}
                cardButtonRender={true}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}

export default Result;
