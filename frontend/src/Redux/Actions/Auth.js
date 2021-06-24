import {
  LOGIN_ACTION_CREATOR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_NOW_ACTION,
} from "../Constants/Auth";

import axios from "axios";

// Action creators wrapped around actions
function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message: message,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_NOW_ACTION,
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    console.log("yoyo");
    console.log(email, password);
    return axios
      .post(`http://localhost:8080/api/login/`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data == null) {
          console.log("no data received");
          dispatch(loginFailure("No data received"));
        } else if (!response.data.token) {
          console.log("no token present ");
          dispatch(
            loginFailure(
              response.data.message || "No token present."
            )
          );
        } else {
          console.log(response.data.token);
          localStorage.setItem(
            "token",
            response.data.token
          );
          dispatch(loginSuccess());
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
        dispatch(loginFailure(err));
      });
  };
}

export function logoutNowThunk() {
  return (dispatch) => {
    localStorage.clear("token");
    dispatch(logoutSuccess());
  };
}
