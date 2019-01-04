import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./component/navBar";
import Map from "./component/map/map-ui";

class Mainpage extends React.Component {
  render() {
    return (
      <body>
        <div>
          <div className="ui internally celled grid">
            <div className="row">
              <div className="five wide column">
                <Navbar />
              </div>
              <div className="ten wide column">
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
