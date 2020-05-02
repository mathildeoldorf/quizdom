import React, { useState, useEffect } from "react";
import axios from "axios";
//MESSAGE HANDLING
import useMessageHandler from "../../components/hooks/MessageHandler";
import Message from "../../components/Message";

const RequestEmailResetPassword = () => {
  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const [email, setEmail] = useState("");

  // HANDLE LOADING
  const [loading, setLoading] = useState(false);

  // HANDLE MESSAGE
  const { message, showMessage } = useMessageHandler(null);

  useEffect(() => {
    showMessage("Please enter your email");
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
    } catch (error) {
      // HANDLE LOADING
      setLoading(false);
      // HANDLE ERROR
      showMessage(error.response.data.response);
      console.log(error.response.data.response);
    }
  };

  const validateForm = () => {
    return email.length > 0 && emailValidation.test(email);
  };

  return (
    <div className="forgottenPassword">
      {message ? <Message resMessage={message} /> : null}
      <form id="forgottenPassword">
        <h2 className="formHeader"> Forgotten password </h2>
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
    </div>
  );
};

export default RequestEmailResetPassword;
