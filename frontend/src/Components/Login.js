import React from "react";
import { loginUser } from "../Redux/Actions/Auth";
import { connect } from "react-redux";
import { Button } from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginRequested: false,
    };
  }

  onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;
    this.setState(state);
  };

  onEnterPressed = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  login = () => {
    console.log("login button pressed");
    this.props.login(this.state.email, this.state.password);
    this.setState({
      loginRequested: true,
    });
  };

  componentClicked() {
    return null;
  }

  render() {
    // isInvalid would become true after action type LOGIN_FAILURE is dispatched
    const { isInvalid } = this.props.userSignin;
    return (
      <div className="loginPage">
        <div>
          <label>E-mail:</label>{" "}
          <input
            onChange={this.onChangeField.bind(
              this,
              "email"
            )}
            type="text"
            value={this.state.email}
          />{" "}
          <br />
          <label>Password:</label>{" "}
          <input
            onChange={this.onChangeField.bind(
              this,
              "password"
            )}
            onKeyPress={this.onEnterPressed}
            type="password"
            value={this.state.password}
          />{" "}
          <br />
          <Button color="secondary" onClick={this.login}>
            Login
          </Button>
          {/* Shows a message if login failure is found */}
          {this.state.loginRequested && isInvalid && (
            <p>Hey! Something is wrong.</p>
          )}
          <br />
        </div>
      </div>
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
    login: (email, password) => {
      dispatch(loginUser(email, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
