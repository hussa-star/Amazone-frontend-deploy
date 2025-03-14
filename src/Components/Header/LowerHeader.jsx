import React from "react";
import { IoMenuSharp } from "react-icons/io5";
import classes from "./Header.module.css"

function LowerHeader() {
  return (
    <>
      <div className={classes.lowerheader_outer}>
        <ul>
          <li>
            <a href="">
              <IoMenuSharp size={25}/>
              <p>All</p>
            </a>
          </li>
          <li>
            <a href="">Today's Deals</a>
          </li>
          <li>
            <a href="">Customer Service</a>
          </li>
          <li>
            <a href="">Registry</a>
          </li>
          <li>
            <a href="">Gift cards</a>
          </li>
          <li>
            <a href="">Sell</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LowerHeader;
