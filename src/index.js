import React from "react";
import ReactDOM from "react-dom";

import Game from "./components/Game.js";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebFont from "webfontloader";

WebFont.load({
    google: {
        families: ["Inknut Antiqua"],
    },
});

const app = document.getElementById("app");
ReactDOM.render(<Game />, app);
