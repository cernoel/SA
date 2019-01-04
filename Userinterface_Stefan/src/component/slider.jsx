import React from "react";
import { Form, Input } from "semantic-ui-react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "2500" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="ui container">
        <h1>Search {this.state.value} Meters around the POI</h1>
        <div className="ui fluid icon input">
          <input
            min={10}
            max={5000}
            step={10}
            type="range"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Item;
