import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utiility/firebase";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import ProductCard from "../../Components/Product/ProductCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import classes from "./Order.module.css";

function Order() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return setOrders([]);

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                <hr />

                {Array.isArray(eachOrder.data.basket) ? (
                  eachOrder.data.basket.map((item) => (
                    <ProductCard key={item.id} flex={true} data={item} />
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Order;
