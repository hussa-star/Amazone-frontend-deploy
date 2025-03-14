import React, { useContext } from "react";
import { GrLocation } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
// import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import { DataContext } from "../DataProvider/Dataprovider";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { auth } from "../../Utiility/firebase";
import bicart from "../../assets/image/bicart.png";
const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket);
  // console.log(user);
  // console.log(dispatch);
  const totalProduct = basket.reduce((sum, item) => sum + item.amount, 0);
  // console.log(totalProduct);

  return (
    <>
      <section className={classes.header_fixed}>
        <div className={classes.header_container}>
          {/* Logo section */}
          <div className={classes.logo_container}>
            <a href="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>
            <div className={classes.delivery}>
              <span className={classes.grlocation}>
                <GrLocation />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Amazone" />
            <BsSearch size={25} />
          </div>

          {/* Other section */}
          <div className={classes.order_container}>
            <a href="#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US Flag"
              />

              <select name="" id="">
                <option value="EN">EN</option>
              </select>
            </a>

            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign out </span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <select name="" id="" className={classes.account}>
                      <option value="">Account & Lists</option>
                    </select>
                  </>
                )}
              </div>
            </Link>

            <a href="/Orders">
              <div>
                <p>Returns</p>
                <span className={classes.order_span}>& Orders</span>
              </div>
            </a>
            <Link to="/Cart" className={classes.cart}>
              {/* <BiCart size={35} /> */}
              <img src={bicart} width={40} alt="bicart" />
              <span>{totalProduct}</span>
              <div>Cart</div>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
