import {
  ADD_LINKS_ACTION_CREATOR,
  LIST_LINKS_ACTION_CREATOR,
} from "../Constants/Links";
import axios from "axios";
const initialState = {
  linkList: [],
};

console.log(initialState);

export function linkReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LINKS_ACTION_CREATOR:
      return {
        linkList: action.payload,
      };
      break;
    case ADD_LINKS_ACTION_CREATOR:
      return {
        linkList: state.linkList.concat([action.payload]),
      };
  }
  return state;
}
