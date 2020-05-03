import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Logout = (props) => {
  // try {
  //   let response = await axios.get("http://localhost:9090/user/logout");
  //   console.log(response.data.response);
  // } catch (error) {
  //   if (error) {
  //     console.log(error);
  //   }
  // }

  return <Redirect to={"/login"} />;
};

export default Logout;
