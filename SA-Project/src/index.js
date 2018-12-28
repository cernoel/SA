import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Items from "./components/itemList";

let item = [
  {
    id: 1,
    name: "Billa",
    adress: "Weg 2"
  },
  {
    id: 2,
    name: "Spar",
    adress: "Weg 4"
  },
  {
    id: 3,
    name: "Bipa",
    adress: "Weg 5"
  }
];

class Mainpage extends React.Component {
  render() {
    return (
      <div>
        <h1>Search Bar</h1>
        <Items item={this.props.item} />
      </div>
    );
  }
}
export default Mainpage;

ReactDOM.render(<Mainpage item={item} />, document.getElementById("root"));
