import React, {
  useState, //useContext
} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//HANDLE MESSAGE
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "./../../Message.jsx";
import Loader from "../../Loader";

const Login = (props) => {
  const emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { message, showMessage } = useMessageHandler(null);

  const history = useHistory();
  const from = props.location.state || {
    from: {
      pathname: "/profile",
    },
  };

  const validateForm = () => {
    return (
      email.length > 0 && password.length >= 8 && emailValidation.test(email)
    );
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      //HANDLE LOADING
      setLoading(true);

      //HANDLE FETCH DATA
      let response = await axios.post("http://localhost:9090/user/login", {
        email: email,
        password: password,
      });

      //HANDLE AUTH
      props.onAuth(true);
      //HANDLE REDIRECT
      history.push(from.from.pathname);
    } catch (error) {
      // HANDLE LOADING
      setLoading(false);

      // HANDLE ERROR
      showMessage(error.response.data.response);
      console.log(error.response.data.response);
    }
  };

  const handleForgottenPassword = () => {
    console.log("User requested a new password");
    history.push("/requestReset");
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="login">
      <div className="formContainer">
        {message ? <Message resMessage={message} /> : null}
        <form onSubmit={handleAuth}>
          <h1 className="headerForm"> Login </h1>
          <label htmlFor="email"></label>
          Email
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password"> </label>
          Password
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className={validateForm() ? "active" : ""}
            disabled={!validateForm()}
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <button
            className="active"
            onClick={handleForgottenPassword}
            type="button"
          >
            Forgotten your password ?
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
