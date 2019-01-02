import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./component/navBar";
import Map from "./component/map/map-ui";

class Mainpage extends React.Component {
  render() {
    return (
      <body>
        <div>
          <div class="ui internally celled grid">
            <div class="row">
              <div class="five wide column">
                <Navbar />
              </div>
              <div class="ten wide column">
                <h1>Loaction </h1>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
export default Mainpage;
ReactDOM.render(<Mainpage />, document.getElementById("root"));
