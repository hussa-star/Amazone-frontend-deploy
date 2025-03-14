import React from "react";
import CatagoryCard from "./CatagoryCard";
import { catagories } from "./CatagoryData";
import classes from "./Catagory.module.css";
function Catagory() {
  return (
    <>
      <div className={classes.card_outer}>
        {catagories.map((item, index) => (
          <CatagoryCard key={index} data={item} />
        ))}
      </div>
    </>
  );
}

export default Catagory;
