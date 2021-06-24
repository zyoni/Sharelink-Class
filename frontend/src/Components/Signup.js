import React from "react";
import { signupUser } from "../Redux/Actions/Register";
import { connect } from "react-redux";
import { Button } from "reactstrap";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameMissing: false,
      emailMissing: false,
      passwordMissing: false,
      unEqualPassword: false,
      signupRequested: false,
    };
  }

  onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;
    this.setState(state);
  };

  onEnterPressed = (e) => {
    if (e.key === "Enter") {
      this.signup();
    }
  };

  signup = () => {
    this.setState({
      nameMissing: false,
      emailMissing: false,
      passwordMissing: false,
      unEqualPassword: false,
      signupRequested: true,
    });
    if (!this.state.name) {
      this.setState({ nameMissing: true });
      return;
    }
    if (!this.state.email) {
      this.setState({ emailMissing: true });
      return;
    }
    if (!this.state.password) {
      this.setState({ passwordMissing: true });
      return;
    }
    if (
      this.state.password !== this.state.confirmPassword
    ) {
      this.setState({ unEqualPassword: true });
      return;
    }
    this.props.signup(
      this.state.name,
      this.state.email,
      this.state.password
    );
  };

  componentClicked() {
    return null;
  }

  render() {
    // isInvalid would become true after action type LOGIN_FAILURE is dispatched
    // statusCode would carry the corresponding HTTP status code upon failure
    const { isInvalid, statusCode } = this.props.userSignup;
    return (
      <div className="signupPage">
        <div>
          <label>Name:</label>{" "}
          <input
            onChange={this.onChangeField.bind(this, "name")}
            type="text"
            value={this.state.name}
          />{" "}
          <br />
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
            type="password"
            value={this.state.password}
          />{" "}
          <br />
          <label>Confirm Password:</label>{" "}
          <input
            onChange={this.onChangeField.bind(
              this,
              "confirmPassword"
            )}
            onKeyPress={this.onEnterPressed}
            type="password"
            value={this.state.confirmPassword}
          />{" "}
          <br />
          <Button color="secondary" onClick={this.signup}>
            SignUp
          </Button>
          {/* Shows a message if checking fail or login failure is found */}
          {this.state.nameMissing && <p>Name Missing!</p>}
          {this.state.emailMissing && <p>Email Missing!</p>}
          {this.state.passwordMissing && (
            <p>Password Missing!</p>
          )}
          {this.state.unEqualPassword && (
            <p>Password not equal!</p>
          )}
          {this.state.signupRequested && isInvalid && (
            <p>Hey! Something is wrong.</p>
          )}
          {this.state.signupRequested &&
            statusCode === 403 && (
              <p>Email Already Occupied!</p>
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
    userSignup: state.userSignup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (name, email, password) => {
      dispatch(signupUser(name, email, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
