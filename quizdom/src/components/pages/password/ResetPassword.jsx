import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./password.css";
//MESSAGE HANDLING
import useMessageHandler from "./../../hooks/MessageHandler.jsx";
import Message from "./../../Message.jsx";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const history = useHistory();

  // HANDLE LOADING
  const [loading, setLoading] = useState(false);

  // HANDLE MESSAGE
  const { message, showMessage } = useMessageHandler(null);

  // THIS IS SENT AS A PARAMETER FROM THE ROUTE COMPONENT IN APP
  const userToken = props.match.params.token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // HANDLE LOADING
      setLoading(true);

      //HANDLE FETCH DATA
      let response = await axios.post("http://localhost:9090/confirmReset/", {
        password: password,
        repeatPassword: repeatPassword,
        token: userToken,
      });

      let data = response.data.response;

      //HANDLE LOADING
      setLoading(false);

      //HANDLE MESSAGE
      showMessage(data);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      //HANDLE LOADING
      setLoading(false);

      //HANDLE MESSAGE
      showMessage(error.response.data.response);
    }
  };

  const validateForm = () => {
    return (
      password.length > 0 &&
      password.length >= 8 &&
      repeatPassword.length > 0 &&
      repeatPassword.length >= 8 &&
      password === repeatPassword
    );
  };

  return (
    <section className="resetPassword">
      <Message resMessage={message} />
      <form id="resetPassword">
        <h2 className="formHeader"> Reset password </h2>
        <label htmlFor="password"> Password </label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password.password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="repeatPassword"> Repeat password </label>
        <input
          id="repeatPassword"
          placeholder="Repeat your password"
          type="password"
          value={password.repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        ></input>
        <button disabled={!validateForm()} onClick={handleSubmit} type="submit">
          {loading ? "Loading..." : "Confirm new password"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
