import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
    tags: ["tag1", "tag2", "tag3"]
  };

  // This is going to render my tags if there are no tags (=== 0) then we are going to return
  // a paragraph that points out that we have not tags
  // Otherwise, we would run into problems regarding our Click state
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags</p>;

    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  // We have to declare this function with = () =>
  // Otherwise we sould run into problems regarding our Click state
  //
  // We update the this.setState
  // this.state.count++ would not work here
  handelIncrement = product => {
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };

  doHandelIncremt = () => {
    this.handelIncrement({ id: 1 });
  };

  // We put a <Reac.Fragment> tag around the text and the button because than it counts as one element
  // Now we can render it
  // We could also just use a <div> tag around but this is not a very clean solution
  //
  // To pirnt out values {this.|nameOfState|.|variableName|}
  //
  // ul = Unordered List
  // we map all the tags we have in our array to an 'ls' -> List Item
  // we need to give it a ceratain key to specfiy it
  //
  // We tell the Button that if it is clicked it sould do something
  // {this.renderTags()}
  render() {
    return (
      <div>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.handelIncrement()}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {this.state.tags.length === 0 && "Pleas create a new tag"}
      </div>
    );
  }

  getBadgeClasses() {
    // We discribe what the font of the class should look like
    let classes = "badge m-2 badge-";
    // We use a if and check state.count
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    // If the count varibale from our "struct" is eqal to 0 than print out Zero
    // We can declare variables with const 'name' = <h1></h1>
    const { count } = this.state;
    if (this.state.count === 0) {
      return "Zero";
    }
    return count;
  }
}

export default Counter;
