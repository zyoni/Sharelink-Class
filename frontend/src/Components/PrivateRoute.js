import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

const PurePrivateRoute = ({
  component,
  userSignin,
  ...rest
}) => {
  const Component = component;
  if (Component != null) {
    return (
      <Route
        {...rest}
        render={(props) =>
          userSignin && userSignin.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  } else {
    return null;
  }
};

const PrivateRoute = connect((state) => ({
  userSignin: state.userSignin,
}))(PurePrivateRoute);

export default PrivateRoute;
