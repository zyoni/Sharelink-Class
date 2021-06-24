import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from "react-router-dom";

import Navbar from "reactstrap/lib/Navbar";
import NavItem from "reactstrap/lib/NavItem";
import Button from "reactstrap/lib/Button";

import AddButton from "./Components/AddButton";
import ViewLinks from "./Components/ViewLinks";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PrivateRoute from "./Components/PrivateRoute";

import { logoutNowThunk } from "./Redux/Actions/Auth";

import { connect } from "react-redux";

class App extends React.Component {
  logout = () => {
    this.props.logoutNow();
  };

  render() {
    const { isAuthenticated } = this.props.userSignin;
    return (
      <Router>
        <div className="App font4">
          <Navbar dark={true}>
            <h3>Xccelerate Links</h3>
            {/* Conditional render: Render different items
            if it is authenticated */}
            {isAuthenticated === false && (
              <NavItem>
                {" "}
                <Link to="/login">Login</Link>
              </NavItem>
            )}
            {isAuthenticated === false && (
              <NavItem>
                <Link to="/signup">Signup</Link>
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem>
                {" "}
                <Link to="/">View Links</Link>
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem>
                <Link to="/addButton">Add Link</Link>
              </NavItem>
            )}
            {isAuthenticated && (
              <Button
                color="secondary"
                onClick={this.logout}
              >
                Logout
              </Button>
            )}
          </Navbar>

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* Conditional route: /login and /signup would be redirected to "/"
          only if it is authenticated */}
          {isAuthenticated && (
            <Route path="/login">
              {" "}
              <Redirect to="/" />{" "}
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/signup">
              {" "}
              <Redirect to="/" />{" "}
            </Route>
          )}
          <PrivateRoute
            exact={true}
            path="/"
            component={ViewLinks}
          />
          <PrivateRoute
            path="/addButton"
            component={AddButton}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSignin: state.userSignin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutNow: () => {
      dispatch(logoutNowThunk());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
