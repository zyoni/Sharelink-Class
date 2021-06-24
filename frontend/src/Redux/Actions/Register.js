import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../Constants/Register";

import axios from "axios";

// Action creators wrapped around actions
function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

function signupFailure(statusCode) {
  return {
    type: SIGNUP_FAILURE,
    payload: statusCode,
  };
}

export function signupUser(name, email, password) {
  return (dispatch) => {
    console.log(name, email, password);
    return axios
      .post(`http://localhost:8080/api/signup/`, {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data == null) {
          console.log("no data received");
          dispatch(signupFailure("No data received"));
        } else if (!response.data.token) {
          console.log("no token");
          dispatch(
            signupFailure(
              response.data.message || "No token present."
            )
          );
        } else {
          console.log(response.data.token);
          localStorage.setItem(
            "token",
            response.data.token
          );
          dispatch(signupSuccess());
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
        dispatch(signupFailure(err.response.status));
      });
  };
}
