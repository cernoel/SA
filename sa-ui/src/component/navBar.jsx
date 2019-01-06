import React from "react";
import { Menu } from "semantic-ui-react";
import Filter from "./filter";
import Favorites from "./favorites";
import AddShop from "./addShop";

class Navbar extends React.Component {
  state = { activeItem: "Filter" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    if (this.state.activeItem === "Filter") {
      return (
        <div class="ui container">
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
            <Menu.Item
              name="Add Shops"
              active={activeItem === "Add Shops"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <Filter />
        </div>
      );
    }
    if (this.state.activeItem === "Favorites") {
      return (
        <div class="ui container">
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
            <Menu.Item
              name="Add Shops"
              active={activeItem === "Add Shops"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <Favorites />
        </div>
      );
    }
    if (this.state.activeItem === "Add Shops") {
      return (
        <div class="ui container">
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
            <Menu.Item
              name="Add Shops"
              active={activeItem === "Add Shops"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <AddShop />
        </div>
      );
    }
  }
}
export default Navbar;
