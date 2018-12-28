import React from "react";
import Item from "./item";

class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  // We use this function to get the value of our search
  // We pass the value we get from our input field 'searchRequest'
  // to our 'search' value in our struct
  updateSearch(searchRequest) {
    this.setState({ search: searchRequest.target.value });
  }

  render() {
    // This filters only the name
    //
    let filterItems = this.props.item.filter(item => {
      return (
        item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div>
        <input
          type="text"
          placeholder="Type to search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <ul>
          {filterItems.map(item => {
            return <Item item={item} key={item.id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default ItemList;
