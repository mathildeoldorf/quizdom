import React, { useState, useEffect } from "react";
import axios from "axios";
import "./password.css";
//MESSAGE HANDLING
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "../../Message.jsx";

const RequestEmailResetPassword = () => {
  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const [email, setEmail] = useState("");

  // HANDLE LOADING
  const [loading, setLoading] = useState(false);

  // HANDLE MESSAGE
  const { message, showMessage } = useMessageHandler("Please enter your email");

  useEffect(() => {
    showMessage(message);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //HANDLE LOADING
      setLoading(true);

      // HANDLE FETCH DATA
      let response = await axios.post("http://localhost:9090/requestReset", {
        email: email,
      });
      let data = response.data.response;
      console.log(data);
      setLoading(false);
      showMessage(data);
      console.log("showing message");
    } catch (error) {
      // HANDLE LOADING
      setLoading(false);
      // HANDLE ERROR
      showMessage(error.response.data.response);
      console.log(error.response.data.response);

      setTimeout(() => {
        showMessage(null);
      }, 2000);
    }
  };

  const validateForm = () => {
    return email.length > 0 && emailValidation.test(email);
  };

  return (
    <section className="forgottenPassword">
      <Message resMessage={message} />
      <form id="forgottenPassword">
        <h1 className="formHeader"> Forgotten your password? </h1>
        <h2>Please enter your email here</h2>
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button disabled={!validateForm} onClick={handleSubmit} type="submit">
          {loading ? "Loading..." : "Request new password"}
        </button>
      </form>
    </section>
  );
};

export default RequestEmailResetPassword;
