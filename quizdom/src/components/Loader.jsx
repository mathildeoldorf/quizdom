import React from "react";

import { DotLoader } from "react-spinners";
import "./utilComponents.css";

const Loader = () => {
  return (
    <div className="Loader-wrapper">
      <DotLoader color={"white"} className="Loader" />
    </div>
  );
};

export default Loader;
