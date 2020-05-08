import React from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
const Home = ({ auth }) => {
  const history = useHistory();
  return (
    <section className="home">
      {!auth ? (
        <div className="homeContent">
          <h2>Welcome to</h2>
          <h1>Quizdom</h1>
          <div className="btnContainer">
            <button onClick={() => history.push("/login")}>Login</button>
            <button onClick={() => history.push("/signup")}>Signup</button>
          </div>
        </div>
      ) : (
        <div className="homeContent">
          <h2>Welcome back to</h2>
          <h1>Quizdom</h1>
          <button
            className="btnProfile active"
            onClick={() => history.push("/profile")}
          >
            Go to your profile
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
