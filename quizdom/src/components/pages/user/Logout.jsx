import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Logout = (props) => {
  const history = useHistory();

  useEffect(() => {
    handleUnAuth();
  }, []);

  const handleUnAuth = async (event) => {
    try {
      let response = await axios.get("http://localhost:9090/user/logout");
      console.log(response.data.response);
      props.onAuth(false);
      history.push("/");
    } catch (error) {
      if (error) {
        console.log(error.response.data.response);
      }
    }
  };

  return <></>;
};

export default Logout;
