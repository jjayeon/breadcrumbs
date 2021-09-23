import React from "react";
import PropTypes from "prop-types";

import Ant from "./Ant.js";

export default function Cell(props) {
    let style = {
        width: 50,
        height: 50,
        border: "1px solid black",
        backgroundColor: props.color,
    };
    let ant;
    if (props.antHere) {
        ant = <Ant antDir={props.antDir} />;
    }
    return (
        <td style={style} onClick={props.onClick}>
            {ant}
        </td>
    );
}

Cell.propTypes = {
    index: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func,
    antHere: PropTypes.bool,
    antDir: PropTypes.number,
};
