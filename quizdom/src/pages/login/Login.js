import React, {
  useState, //useContext
} from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from "axios";

//HANDLE MESSAGE
import useMessageHandler from "../../components/hooks/MessageHandler";
import Message from "../../components/Message";
// import AuthContext from "./../../components/contexts/AuthContext";

const Login = (props) => {
  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { message, showMessage } = useMessageHandler(null);

  // const authentication = useContext(AuthContext);
  // console.log(authentication);

  const history = useHistory();
  const from = props.location.state || { from: { pathname: "/profile" } };

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

      let data = response.data.response;
      setUser(data);

      //HANDLE AUTH
      props.onAuth(true);
      // authentication.toggleAuthentication();

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

  return (
    <div className="formContainer">
      {message ? <Message resMessage={message} /> : null}
      <form onSubmit={handleAuth}>
        <h2 className="formHeader"> Login </h2>
        <label htmlFor="email">
          Email
          <input
            id="email"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
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
          Forgotten your password?
        </button>
      </form>
    </div>
  );
};

export default Login;
