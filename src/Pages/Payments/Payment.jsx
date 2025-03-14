import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/LayOut/Layout";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import numeral from "numeral";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utiility/firebase";
import { Type } from "../../Utiility/action.type";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [processing, setProcessing] = useState(false);

  console.log(user);

  const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);

  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const handleChange = (e) => {
    console.log(e);
    if (e?.error?.message) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Step 1: Request a payment intent getting client secret
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${subtotal * 100}`,
      });

      // console.log(response.data);

      const clientSecret = response?.data?.clientSecret;

      // console.log(clientSecret);

      // Step 2: Confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      // Step 3: Save order to Firestore

      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // console.log("done");

      //  Step 4: Clear basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/Orders", {
        state: { msg: "your order has been placed successfully" },
      });
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>
      {/* payment */}
      <section className={classes.payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>delivery adress</h3>
          <div>
            <div>{user?.email}</div>
            <div>123,piassa street</div>
            <div>dessie wollo</div>
          </div>
        </div>
        <hr />
        {/* product */}

        <div className={classes.flex}>
          <h3>review items & deliverly</h3>
          <div>
            {basket?.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                flex={true}
                desc={false}
              />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}

        <div className={classes.flex}>
          <h3>payment method</h3>
          <div className={classes.card_container}>
            <div className={classes.card_detail}>
              <form onSubmit={handlePayment}>
                {cardError && <span style={{ color: "red" }}>{cardError}</span>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total price | {numeral(subtotal).format("$0,0.00")}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="dark" size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Buy Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;

// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import Layout from "../../Components/Layout/Layout";
// import { DataContext } from "../../Components/DataProvider/Dataprovider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import numeral from "numeral";
// import { axiosInstance } from "../../Api/axios";
// import { ClipLoader } from "react-spinners";
// import { db } from "../../Utiility/firebase";
// import { Type } from "../../Utiility/action.type";
// import { useNavigate } from "react-router-dom";
// import { doc, setDoc } from "firebase/firestore";

// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   const [processing, setProcessing] = useState(false);
//   const [cardError, setCardError] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   // Calculate total items and subtotal
//   const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0) || 0;
//   const subtotal =
//     basket?.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;

//   const handleChange = (e) => {
//     if (e?.error?.message) {
//       setCardError(e.error.message);
//     } else {
//       setCardError("");
//     }
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       console.error("Stripe has not loaded properly.");
//       return;
//     }

//     if (!user?.uid) {
//       console.error("User not found.");
//       return;
//     }

//     try {
//       setProcessing(true);

//       // Step 1: Get client secret from backend
//       const response = await axiosInstance.post(
//         `/payment/create?total=${subtotal * 100}`
//       );

//       const clientSecret = response?.data?.clientSecret;
//       if (!clientSecret) throw new Error("Payment intent creation failed.");

//       // Step 2: Confirm payment
//       const { paymentIntent, error } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         console.error("Payment failed:", error);
//         setCardError(error.message);
//         setProcessing(false);
//         return;
//       }

//       // Step 3: Save order to Firestore
//       await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
//         basket,
//         amount: paymentIntent.amount,
//         created: paymentIntent.created,
//       });

//       console.log("Order successfully saved.");

//       // Step 4: Clear basket
//       dispatch({ type: Type.EMPTY_BASKET });

//       setProcessing(false);
//       navigate("/Orders", {
//         state: { msg: "Your order has been placed successfully" },
//       });
//     } catch (error) {
//       console.error("Payment error:", error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <Layout>
//       {/* Header */}
//       <div className={classes.payment_header}>
//         Checkout ({totalItems}) items
//       </div>

//       {/* Payment Section */}
//       <section className={classes.payment}>
//         {/* Address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123, Piassa Street</div>
//             <div>Dessie, Wollo</div>
//           </div>
//         </div>
//         <hr />

//         {/* Product Review */}
//         <div className={classes.flex}>
//           <h3>Review Items & Delivery</h3>
//           <div>
//             {Array.isArray(basket) &&
//               basket.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   data={product}
//                   flex={true}
//                   desc={false}
//                 />
//               ))}
//           </div>
//         </div>
//         <hr />

//         {/* Card Payment Form */}
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>
//           <div className={classes.card_container}>
//             <div className={classes.card_detail}>
//               <form onSubmit={handlePayment}>
//                 {cardError && <span style={{ color: "red" }}>{cardError}</span>}
//                 <CardElement onChange={handleChange} />
//                 <div className={classes.payment_price}>
//                   <div>
//                     <span>
//                       Total Price | {numeral(subtotal).format("$0,0.00")}
//                     </span>
//                   </div>
//                   <button type="submit" disabled={processing}>
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="dark" size={12} />
//                         <p>Please wait...</p>
//                       </div>
//                     ) : (
//                       "Buy Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Payment;
