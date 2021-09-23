import React from "react";

import { getHighScore } from "../util/highscore";

export default function Highscore() {
    return (
        <span className="highscore">
            <span>Highscore:</span>
            {getHighScore() === "Infinity"
                ? "Win to get your highscore!"
                : getHighScore()}
        </span>
    );
}
