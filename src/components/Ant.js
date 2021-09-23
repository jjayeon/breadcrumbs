import React from "react";
import PropTypes from "prop-types";

import antIcon from "./ant.png";

export default function Ant(props) {
    let rot = props.antDir * 90;
    return (
        <img
            src={antIcon}
            width={30}
            style={{
                transform: `rotate(${rot}deg)`,
            }}
        />
    );
}

Ant.propTypes = {
    antDir: PropTypes.number,
};

/*
old transforms, just in case

.rot_90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}

.rot_180 {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

.rot_270 {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

*/
