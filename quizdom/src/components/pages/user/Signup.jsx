import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//ERROR HANDLING
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "../../Message.jsx";

const Register = (props) => {
  const emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const { message, showMessage } = useMessageHandler(null);

  const history = useHistory();
  const from = props.location.state || { from: { pathname: "/profile" } };

  const [user, setUser] = useState({});

  const validateForm = () => {
    return (
      email.length > 0 && password.length >= 8 && emailValidation.test(email)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);

    try {
      //HANDLE LOADING
      setLoading(true);
      //FETCH DATA
      let response = await axios.post("http://localhost:9090/user/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      });

      let data = response.data.response;

      console.log(data);

      setUser(data);

      //HANDLE AUTH
      props.onAuth(true);

      showMessage(data);

      //HANDLE REDIRECT
      history.push(from.from.pathname);
    } catch (error) {
      //HANDLE LOADING
      setLoading(false);

      // HANDLE ERROR
      showMessage(error.response.data.response);
      console.log(error.response.data.response);
    }
  };

  return (
    <section className="signup">
      <div className="formContainer">
        <Message resMessage={message} />
        <form className="formSignup" onSubmit={handleSubmit}>
          <h2 className="formHeader"> Sign up </h2>
          <div className="inputContainer">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Repeat password">Repeat password</label>
              <input
                id="repeatPassword"
                placeholder="repeatPassword"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div></div>
          </div>
          <button
            className={!validateForm ? "active" : ""}
            disabled={!validateForm}
            type="submit"
          >
            {loading ? "Loading" : "Sign up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
