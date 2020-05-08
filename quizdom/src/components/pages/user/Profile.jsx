import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./user.css";

//HANDLE MESSAGE
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "./../../Message.jsx";
import Loader from "../../Loader";

const Profile = (props) => {
  const emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const history = useHistory();

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [update, setUpdate] = useState(false);

  const { message, showMessage } = useMessageHandler(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      let response = await axios.get("http://localhost:9090/user/profile");
      let data = response.data.response;
      setUser(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      // HANDLE ERROR
      showMessage(error.response.data.response);
      console.log(error.response.data.response);
    }
  };

  const validateForm = () => {
    if (email) {
      return emailValidation.test(email);
    }
    return true;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="profile">
      {loading ? <Loader /> : null}
      {message ? <Message resMessage={message} /> : null}
      <div className="banner">
        <h1 className="headerSection">Welcome to Quizdom, {user.firstName}</h1>
        <h2>Start testing your wits today!</h2>
      </div>

      <div className="circle"></div>
      <div className="twoColumnContainer">
        <div className="sepContainer profileDetails">
          <h2 className="headerSection">Your information</h2>
          <div className="sepContainer">
            <label htmlFor="firstName">First name</label>
            <p className="name">{firstName ? firstName : user.firstName}</p>
          </div>
          <div className="sepContainer">
            <label htmlFor="lastName">Last name</label>
            <p className="name">{lastName ? lastName : user.lastName}</p>
          </div>
          <div className="sepContainer">
            <label htmlFor="email">Email</label>
            <p className="name">{email ? email : user.email}</p>
          </div>
        </div>
        <div className="btnContainer">
          <button onClick={() => history.push("quizzes")} className="active">
            Test your quizdom
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
