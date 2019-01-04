import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import Filter from "./filter";
import Favorites from "./favorites";

class Navbar extends React.Component {
  state = { activeItem: "Filter" };
  




  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    if (this.state.activeItem === "Filter") {
      return (
        <div>
          <Menu pointing secondary>
            <Menu.Item
              name="Filter"
              active={activeItem === "Filter"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Favorites"
              active={activeItem === "Favorites"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <Filter />
        </div>
      );
    }
    if (this.state.activeItem === "Favorites") {
      return (
        <div>
          <Menu pointing secondary>
            <Menu.Item
              name="Filter"
              active={activeItem === "Filter"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Favorites"
              active={activeItem === "Favorites"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <Favorites />
        </div>
      );
    }
  }
}
export default Navbar;
