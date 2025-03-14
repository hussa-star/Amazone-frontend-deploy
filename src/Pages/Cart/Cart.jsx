import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/LayOut/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { Type } from "../../Utiility/action.type";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <div className={classes.cart_outer_container}>
        <div className={classes.cart_inner_container}>
          <h2>Hello</h2>
          <h3>your shoping bascket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>no products are selected</p>
          ) : (
            basket?.map((item) => (
              <section className={classes.product_section}>
                <ProductCard
                  key={item.id}
                  data={item}
                  flex={true}
                  desc={true}
                  cardButtonRender={false}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.eachbtn}
                    onClick={() => increment(item)}
                  >
                    <FaArrowAltCircleUp size={25} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.eachbtn}
                    onClick={() => decrement(item.id)}
                  >
                    <FaArrowAltCircleDown size={25} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal_outer_container}>
            <div>
              <p>subtotal({basket?.length} item)</p>
              {numeral(subtotal).format("$0,0.00")}
            </div>

            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>
            <Link to="/payments">
              <div className={classes.payment}>continue payment</div>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
