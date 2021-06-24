import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../Constants/Register";

import { LOGIN_SUCCESS } from "../Constants/Auth";

const initialState = {
  isInvalid: false,
};

export function regReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return Object.assign(
        {},
        {
          isInvalid: false,
        }
      );
    case LOGIN_SUCCESS:
      return Object.assign(
        {},
        {
          isInvalid: false,
        }
      );
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isInvalid: true,
        statusCode: action.payload,
      });
    default:
      return state;
  }
}
