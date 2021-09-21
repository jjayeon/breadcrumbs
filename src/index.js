import React, { Component } from "react";
import ReactDOM from "react-dom";
//import PropTypes from "prop-types";

import "./index.css";

class App extends Component {
    render() {
        return <p>open the console</p>;
    }
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
console.log("Hello world!");
