import axios from "axios";
import {
  ADD_LINKS_ACTION_CREATOR,
  LIST_LINKS_ACTION_CREATOR,
} from "../Constants/Links";

// Defining the actions and what will be sent with each one
// Interactions within Redux, ont he frontend
export function ListLinksAction(links) {
  return {
    payload: links,
    type: LIST_LINKS_ACTION_CREATOR,
  };
}

export function AddLinkAction(link) {
  return {
    payload: link,
    type: ADD_LINKS_ACTION_CREATOR,
  };
}

// Setting up ReduxThunk so send the information to the backend
export function ListLinksActionThunk(search, id) {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:8080/api/link?search=${search}&id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        dispatch(ListLinksAction(res.data));
      });
  };
}

export function AddLinkActionThunk(link, id) {
  return (dispatch) => {
    console.log(link, id, "in redux");
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/api/link",
        { link, id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Gets here");
        dispatch(AddLinkAction(res.data));
      });
  };
}

//https://github.com/axios/axios/issues/751
