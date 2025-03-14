import React from "react";
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/Dataprovider";
import { Type } from "../../Utiility/action.type";

function ProductCard({ data, desc, flex, cardButtonRender }) {
  const { id, title, image, rating, price, description } = data;
  const [state, dispatch] = useContext(DataContext);
  // console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        title,
        image,
        rating,
        price,
        description,
        id
      },
    });
  };

  return (
    <div className={`${classes.product_card}  ${flex ? classes.flex : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="image" />
      </Link>

      <div className={classes.product_discrption}>
        <h3>{title}</h3>
        <div className={classes.product_rating}>
          <Rating value={rating.rate} precision={0.1} />
          <span className={classes.product_count}>
            <small>{rating.count}</small>
          </span>
        </div>
        <div className={classes.product_price}>
          {numeral(price).format("$0,0.00")}
        </div>
        {desc && <div className={classes.disc}>{description}</div>}

        {cardButtonRender && (
          <button className={classes.product_card_button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
