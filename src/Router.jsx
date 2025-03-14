import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Order from "./Pages/Orders/Order";
import Payment from "./Pages/Payments/Payment";
import Results from "./Pages/Results/Result";
import ProductDetail from "./Pages/ProductDetails/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51Qv3QVDxcH7z8p8wYlxS2fRLrgvth2TVYRV4wmnMFGqoHUGGMx10SaXc7c1mb3N94iJ0Qe6YSHpXkptSfAlCVkja00ALKvBzbd"
);
function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/Payments"
          element={
            <ProtectedRoute
              msg={"you must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <ProtectedRoute
              msg={"you must login to see your order"}
              redirect={"/Orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routering;
