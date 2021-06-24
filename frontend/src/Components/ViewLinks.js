import React from "react";

import LinkList from "./LinkList";
import SearchBar from "./SearchBar";

import { connect } from "react-redux";
import { ListLinksActionThunk } from "../Redux/Actions/Links";

import jwt from "jsonwebtoken";
import config from "../config";

class ViewLinks extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.removeItem("token");
    let user = jwt.verify(
      localStorage.getItem("token"),
      config.jwtSecret
    );
    let { name, id } = user;
    this.state = {
      name,
      id,
    };
  }

  componentDidMount() {
    this.props.loadLinksConnect("", this.state.id);
  }

  render() {
    console.log(this.props.links);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="profileDiv col-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
              className="App-logo"
              alt="logo"
            />
            <div>
              <div className="profileName">
                {this.state.name}
              </div>
              {/* Can replace with better wording */}
              <div>
                {" "}
                {this.props.links
                  ? this.props.links.length
                  : 0}{" "}
                Favourite Link(s)
              </div>
            </div>
          </div>
          <div className="col-8">
            <SearchBar
              onSearchChange={this.onSearchBarChanged}
            />
            <LinkList
              key="uniqueKey"
              links={this.props.links}
            />
          </div>
        </div>
      </div>
    );
  }

  onSearchBarChanged = (search) => {
    this.props.loadLinksConnect(search, this.state.id);
  };
}

const mapStateToProps = (state) => {
  return {
    links: state.linkStore.linkList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLinksConnect: (search, user_id) => {
      dispatch(ListLinksActionThunk(search || "", user_id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLinks);
