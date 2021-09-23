import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { ArrowRight, Play, RotateCw, X } from "react-feather";

export default function Buttons(props) {
    return (
        <div className="game-buttons">
            <Button
                className="list-group-item-danger"
                variant="danger"
                onClick={props.init}
                disabled={props.playing}
            >
                <RotateCw size={24} className="rotate-symbol" />
                New Game
            </Button>
            <Button
                className="list-group-item-danger"
                variant="danger"
                onClick={props.reset}
                disabled={props.playing}
            >
                <RotateCw size={24} className="rotate-symbol" />
                Reset
            </Button>
            <Button
                className={
                    props.playing
                        ? "list-group-item-danger"
                        : "list-group-item-primary"
                }
                variant={props.playing ? "danger" : "primary"}
                onClick={props.togglePlaying}
            >
                {props.playing ? (
                    <X size={24} className="playandstop-symbol" />
                ) : (
                    <Play size={24} className="playandstop-symbol" />
                )}
                {props.playing ? "Stop" : "Play"}
            </Button>
            <Button
                className="list-group-item-info"
                variant="info"
                onClick={props.update}
                disabled={props.playing}
            >
                <ArrowRight size={23} className="arrow-symbol" />
                Step
            </Button>
        </div>
    );
}

Buttons.propTypes = {
    init: PropTypes.func,
    reset: PropTypes.func,
    togglePlaying: PropTypes.func,
    update: PropTypes.func,
    playing: PropTypes.bool,
};
