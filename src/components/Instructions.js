import React from "react";
import PropTypes from "prop-types";

export default function FlippedTiles(props) {
    return (
        <span className="user-instructions">
            Flipped tiles: {props.flipped_tiles} (try to get this as low as you
            can!)
        </span>
    );
}

FlippedTiles.propTypes = {
    flipped_tiles: PropTypes.number,
};
