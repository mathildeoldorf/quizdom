// TO DO:
// APPLY ROUTE PROTECTING TO QUIZZES

// 3. Create frontend for sign up √
// 4. Use axios to fetch the endpoint from the server "/user/register" to effectively save the user in the DB √

// 6. Fetch with axios - bind with backend for reset and request new password
// 7. Quizzes auth
// 8. Pass questions as props to single quiz

// TODO for the session:
//// Redirects (register)
/// Quizzes
/// Signout √
// Conditional rendering of the links √
// binding with the backend

// 2. 2 forms: √
//// √ Build a form for "forgotten password", where the user can pass their email
//// √ Build a form for "reset password", where the user can pass password and repeatPassword
// 5. √ Clean code for unused variables and imports

// Need to check if the user is saved in the session to render either login or logout and profile
// Toggle active class on the button when the form validates
// Naming conventions

import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Quizzes from "./pages/quizzes/Quizzes";
import Profile from "./pages/profile/Profile";
import Logout from "./pages/logout/Logout";
import Reset from "./pages/password/ResetPassword";
import RequestEmail from "./pages/password/RequestEmailResetPassword";
import Register from "./pages/register/Register";
import AuthContext from "./components/contexts/AuthContext";

const initialAuth = false;

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
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const App = () => {
  const [auth, setAuth] = useState(initialAuth);
  const toggleAuthentication = () => {
    setAuth(!auth);
    // auth ?
    // toggleAuthStorage();
  };

  // const toggleAuthStorage = () => {
  //   localStorage.getItem("UserAuth")
  //     ? localStorage.getItem("UserAuth")
  //     : window.localStorage.clear();
  // };

  // console.log(localStorage.getItem("UserAuth"));

  // const authentication = useContext(AuthContext);

  // console.log(authentication);
  useEffect(() => {
    window.localStorage.setItem("UserAuth", JSON.stringify(!auth));
  }, [auth]);

  console.log(auth);

  const handleAuth = (data) => {
    setAuth(data);
    // console.log(auth);
  };

  return (
    // <AuthContext.Provider value={{ auth, toggleAuthentication }}>
    <Router basename={"/"}>
      <div className="App">
        <nav className="Navigation">
          <header className="App-header">
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <h1>Quizdom</h1>
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
                    Quizzes
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
                    // onClick={() => setAuth(false)}
                  >
                    Logout
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
                    to={`${process.env.PUBLIC_URL}/quizzes`}
                  >
                    Quizzes
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
                    to={`${process.env.PUBLIC_URL}/register`}
                  >
                    Signup
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/quizzes`}
              component={(props) => <Quizzes {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={(props) => <Login onAuth={auth} {...props} />}

              // value={ { value: state.value, updateState }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={(props) => <Register onAuth={auth} {...props} />}
            />
            <PrivateRoute
              exact
              auth={auth}
              path={`${process.env.PUBLIC_URL}/profile`}
              component={(props) => <Profile onAuth={auth} {...props} />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/logout`}
              component={(props) => <Logout {...props} />}
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
        <footer>This App is created by Mathilde Runge</footer>
      </div>
    </Router>
    // </AuthContext.Provider>
  );
};

export default App;
