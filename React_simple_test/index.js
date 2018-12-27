import React from "react";
import ReactDOM from "react-dom";
import Counters from "./components/counters";
// We need this bootstarp Folder in order to edit css in our file
import "bootstrap/dist/css/bootstrap.css";

const element = <h1>Helldsfo World</h1>;
ReactDOM.render(<Counters />, document.getElementById("root"));
