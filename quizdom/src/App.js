import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/utilComponents.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import Home from "./components/pages/home/Home.jsx";
import Login from "./components/pages/user/Login.jsx";
import Profile from "./components/pages/user/Profile.jsx";
import Logout from "./components/pages/user/Logout.jsx";
import Reset from "./components/pages/password/ResetPassword.jsx";
import RequestEmail from "./components/pages/password/RequestEmailResetPassword.jsx";
import Register from "./components/pages/user/Signup.jsx";
import Quizzes from "./components/pages/quizzes/Quizzes.jsx";

import axios from "axios";
axios.defaults.withCredentials = true; //makes sure the cookies are the same for all routes

const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => {
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

const NotAuthenticatedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth !== true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
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

const App = (props) => {
  const fetchAuthorization = async () => {
    try {
      const response = await axios.get("http://localhost:9090/user/authorize");
      setAuth(response.data);
    } catch (error) {
      setAuth(false);
    }
  };

  const [auth, setAuth] = useState(false);

  const handleAuth = (data) => {
    setAuth(data);
  };

  const handleUnAuth = () => {
    setAuth(false);
  };

  useEffect(() => {
    console.log("Mounting and fecthing auth - currently auth is " + auth);
    fetchAuthorization();
    return () => console.log("Unmounting...");
  }, [auth]);

  return (
    <Router basename={"/"}>
      <div className="App">
        <nav className="Navigation">
          <header className="App-header">
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <h1> Quizdom </h1>
            </Link>
          </header>
          <ul
            style={{
              gridTemplateColumns: auth ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
            }}
          >
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
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={(props) => <Home {...props} auth={auth} />}
            />

            <AuthenticatedRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/quizzes`}
              component={(props) => <Quizzes {...props} />}
            />
            <NotAuthenticatedRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/login`}
              component={(props) => <Login onAuth={handleAuth} {...props} />}
            />
            <NotAuthenticatedRoute
              exact
              path={`${process.env.PUBLIC_URL}/signup`}
              component={(props) => <Register onAuth={handleAuth} {...props} />}
            />
            <AuthenticatedRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/profile`}
              component={(props) => (
                <Profile onUnAuth={handleUnAuth} {...props} />
              )}
            />
            <NotAuthenticatedRoute
              exact
              path={`${process.env.PUBLIC_URL}/logout`}
              component={(props) => <Logout onAuth={handleUnAuth} {...props} />}
            />
            <NotAuthenticatedRoute
              exact
              path={`${process.env.PUBLIC_URL}/confirmReset/:ID`}
              component={(props) => <Reset {...props} />}
            />
            <NotAuthenticatedRoute
              exact
              path={`${process.env.PUBLIC_URL}/requestReset`}
              component={(props) => <RequestEmail {...props} />}
            />
          </Switch>
        </main>
        <footer> This App is created by Mathilde Runge </footer>
      </div>
      <div>{props.isAuthorized}</div>
    </Router>
  );
};

export default App;
