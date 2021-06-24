import React from "react";

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="listItem">
        <a
          data-id={this.props.id}
          href={this.props.url}
          target="blank"
        >
          {this.props.title}
        </a>
        {this.props.tags
          ? this.props.tags.map((tag, i) => (
              <p className="tag" key={i}>
                {tag.name}
              </p>
            ))
          : ""}
      </div>
    );
  }
}
