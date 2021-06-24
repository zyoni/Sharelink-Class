import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_NOW_ACTION,
} from "../Constants/Auth";

import { SIGNUP_SUCCESS } from "../Constants/Register";

const initialState = {
  isAuthenticated:
    false || localStorage.getItem("token") != null,
  isInvalid: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isInvalid: false,
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isInvalid: false,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isInvalid: true,
      });
    case LOGOUT_NOW_ACTION:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isInvalid: false,
      });
    default:
      return state;
  }
}
