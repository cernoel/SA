import React from "react";

class Item extends React.Component {
  render() {
    return (
      <li>
        {this.props.item.name} {this.props.item.adress}
      </li>
    );
  }
}

export default Item;
