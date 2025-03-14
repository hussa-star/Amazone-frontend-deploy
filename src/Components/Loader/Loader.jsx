import React from "react";
import { ScaleLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <ScaleLoader color="#1a2730" />
    </div>
  );
}

export default Loader;
