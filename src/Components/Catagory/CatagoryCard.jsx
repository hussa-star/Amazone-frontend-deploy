import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({ data}) {
  return (
    <div className={classes.card}>
      <Link to={`/category/${data.name}`}>
        <h2>{data.title}</h2>
        <img src={data.imageLink} alt="image" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
