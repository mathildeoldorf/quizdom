// TO DO:
// APPLY ROUTE PROTECTING TO QUIZZES

// Style frontend for signup
// style frontend for login
// style navigation
// style error messages

// 7. Quizzes auth
// 8. Pass questions as props to single quiz

// TODO for the session:
/// Quizzes check for auth + singleQUiz

//refine the message handler to handle message type

// QUESTIONS
// How to handle the logout route to kill express session - it complains about the try/catch /// Signout
// Toggle active class on the button when the form validates
// Passing email in request password passes the input email - in real life thats good, but should we hand it in like that?

import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import Login from "./components/pages/user/Login.jsx";
import Quizzes from "./components/pages/quizzes/Quizzes.jsx";
import Profile from "./components/pages/user/Profile.jsx";
import Logout from "./components/pages/user/Logout.jsx";
import Reset from "./components/pages/password/ResetPassword.jsx";
import RequestEmail from "./components/pages/password/RequestEmailResetPassword.jsx";
import Register from "./components/pages/user/Signup.jsx";
import SingleQuiz from "./components/pages/quizzes/SingleQuiz.jsx";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  // Component = Recieved as a prop, and it will be the protected route's component
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? true : false);

  const handleAuth = (data) => {
    setAuth(data);
    window.localStorage.setItem("auth", data);
  };

  const handleUnAuth = () => {
    setAuth(false);
    window.localStorage.clear();
  };

  return (
    <Router basename={"/"}>
      <div className="App">
        <nav className="Navigation">
          <header className="App-header">
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <h1> Quizdom </h1>
            </Link>
          </header>
          <ul>
            {auth ? (
              <React.Fragment>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/`}
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/quizzes`}
                  >
                    Test your quizdom
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/profile`}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/logout`}
                    onClick={handleUnAuth}
                  >
                    Log out
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/`}
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                {/* <li>
                                <NavLink
                                  activeClassName="active"
                                  to={`${process.env.PUBLIC_URL}/quizzes`}
                                >
                                  Quizzes
                                </NavLink>
                              </li> */}
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/login`}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to={`${process.env.PUBLIC_URL}/signup`}
                  >
                    Sign up
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} />
            <PrivateRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/quizzes`}
              component={(props) => <Quizzes {...props} />}
            />
            <PrivateRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/singleQuiz`}
              component={(props) => <SingleQuiz {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={(props) => <Login onAuth={handleAuth} {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/signup`}
              component={(props) => <Register onAuth={handleAuth} {...props} />}
            />
            <PrivateRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/profile`}
              component={(props) => <Profile {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/logout`}
              component={(props) => <Logout onAuth={handleUnAuth} {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/confirmReset/:ID`}
              component={(props) => <Reset {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/requestReset`}
              component={(props) => <RequestEmail {...props} />}
            />
          </Switch>
        </main>
        <footer> This App is created by Mathilde Runge </footer>
      </div>
    </Router>
  );
};

export default App;
