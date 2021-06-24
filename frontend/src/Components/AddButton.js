import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { AddLinkActionThunk } from "../Redux/Actions/Links";

import jwt from "jsonwebtoken";
import config from "../config";

export class PureAddButton extends React.Component {
  constructor(props) {
    super(props);
    let user = jwt.verify(
      localStorage.getItem("token"),
      config.jwtSecret
    );
    let { id: user_id } = user; // equivalent to "let user_id = user.id;"
    this.state = {
      modal: false,
      tags: [],
      title: "",
      url: "",
      user_id,
    };
  }

  render() {
    return (
      <div className="container">
        <Button color="secondary" onClick={this.toggle}>
          Add Link
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            {" "}
            Add Link Form
          </ModalHeader>
          <ModalBody>
            <label>Name:</label> <br />
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={this.onNameChange}
              value={this.state.title}
            />{" "}
            <br />
            <label>URL:</label> <br />
            <input
              type="text"
              placeholder="URL"
              className="form-control"
              onChange={this.onURLChange}
              value={this.state.url}
            />{" "}
            <br />
            <label>Tags: </label>
            {this.state.tags.map((tag, i) => {
              return (
                <input
                  key={i}
                  type="text"
                  onChange={this.onTagChange.bind(this, i)}
                  value={tag.name}
                />
              );
            })}
            <br />
            <Button color="secondary" onClick={this.addTag}>
              Add Tag
            </Button>
            <ModalFooter>
              <Button
                color="primary"
                onClick={this.addLink}
              >
                Submit
              </Button>
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onNameChange = (e) => {
    this.setState({
      title: e.currentTarget.value,
    });
  };

  onURLChange = (e) => {
    this.setState({
      url: e.currentTarget.value,
    });
  };

  onTagChange = (i, e) => {
    const tags = this.state.tags.slice();
    tags[i] = {
      name: e.currentTarget.value,
    };
    this.setState({
      tags: tags,
    });
  };

  addTag = () => {
    this.setState({
      tags: this.state.tags.concat([{ name: "" }]),
    });
  };

  addLink = () => {
    this.props.addLinkConnect(
      {
        tags: this.state.tags,
        title: this.state.title,
        url: this.state.url,
      },
      this.state.user_id
    );

    this.setState({
      ...this.state,
      modal: false,
      tags: [],
      title: "",
      url: "",
    });
  };
}

const mapStateToProps = (state) => {
  return {
    links: state.linkStore.linkList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLinkConnect: (link, user_id) => {
      console.log(link, user_id);
      dispatch(AddLinkActionThunk(link, user_id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PureAddButton);

//https://stackoverflow.com/questions/43995197/react-redux-action-is-not-defined
