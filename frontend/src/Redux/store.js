import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import { linkReducer } from "./Reducers/Links";
import { authReducer } from "./Reducers/Auth";
import { regReducer } from "./Reducers/Register";

import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  linkStore: linkReducer,
  userSignin: authReducer,
  userSignup: regReducer,
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createReduxStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk),
      applyMiddleware(logger)
    )
  );
};
