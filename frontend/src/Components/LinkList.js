import React from "react";
import LinkItem from "./LinkItem";

export default class LinkedList extends React.Component {
  render() {
    return (
      <div>
        {this.props.links.map((link, i) => (
          <LinkItem
            key={i}
            title={link.title}
            url={link.url}
            id={link.id}
            tags={link.tags}
          />
        ))}
      </div>
    );
  }
}
