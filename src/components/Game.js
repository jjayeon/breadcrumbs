import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { ArrowRight, Play, RotateCw, X } from "react-feather";
import { css, cx } from "@emotion/css";

const Styles = {
    table_style: css`
        & td {
            transition: all 0.25s;
        }

        &:hover {
            cursor: pointer;
        }
    `,
};

export default class Game extends Component {
    constructor(props) {
        super(props);

        let size = 6;

        let grid = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = Math.random() < 0.5 ? "grey" : "white";
            }
        }
        grid[size - 1][size - 1] = "green";

        let antX = 0,
            antY = 0,
            antDir = 1;

        let playing = false;

        /*
          antDir can be    0, 1, 2, 3, 
          corresponding to N, E, S, W.
        */

        this.state = {
            size,
            grid,
            antX,
            antY,
            antDir,
            playing,
        };

        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
        this.win = this.win.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
        this.reset = this.reset.bind(this);
    }

    toggle(i, j) {
        let grid = this.state.grid;
        let color = grid[i][j];
        if (color === "white") color = "grey";
        else if (color === "grey") color = "white";
        grid[i][j] = color;

        this.setState({
            grid,
        });
    }

    reset() {
        this.setState({ antX: 0, antY: 0, antDir: 1 });
    }

    update() {
        let antDir = this.state.antDir;
        let antX = this.state.antX;
        let antY = this.state.antY;
        let size = this.state.size;

        let bounce = false;
        /* eslint-disable */
        switch (antDir) {
            case 0:
                antY -= 1;
                if (antY < 0) {
                    antY = 0;
                    antDir = 2;
                    bounce = true;
                }
                break;
            case 1:
                antX += 1;
                if (antX >= size) {
                    antX = size - 1;
                    antDir = 3;
                    bounce = true;
                }
                break;
            case 2:
                antY += 1;
                if (antY >= size) {
                    antY = size - 1;
                    antDir = 0;
                    bounce = true;
                }
                break;
            case 3:
                antX -= 1;
                if (antX < 0) {
                    antX = 0;
                    antDir = 1;
                    bounce = true;
                }
                break;
        }

        if (!bounce) {
            let color = this.state.grid[antY][antX];
            switch (color) {
                case "white":
                    antDir = (antDir + 1) % 4;
                    break;
                case "grey":
                    antDir = (antDir - 1 + 4) % 4;
                    break;
            }
        }

        /* eslint-enable */

        this.setState({
            antDir,
            antX,
            antY,
        });

        if (antX === size - 1 && antY === size - 1) {
            this.win();
        }
    }

    win() {
        alert("you win!");
    }

    togglePlaying() {
        const playing = this.state.playing;

        if (playing) {
            clearInterval(this.stepInterval);
        } else {
            // TODO: Change the speed to a variable adjustable with a slider
            this.stepInterval = setInterval(this.update, 500);
        }

        this.setState({ playing: !playing });
    }

    render() {
        let out = [];
        for (let i = 0; i < this.state.size; i++) {
            let row = [];
            for (let j = 0; j < this.state.size; j++) {
                let style = {
                    width: 50,
                    height: 50,
                    border: "1px solid black",
                    backgroundColor: this.state.grid[i][j],
                };
                let ant;
                /* eslint-disable */
                switch (this.state.antDir) {
                    case 0:
                        ant = "^";
                        break;
                    case 1:
                        ant = ">";
                        break;
                    case 2:
                        ant = "v";
                        break;
                    case 3:
                        ant = "<";
                        break;
                }
                /* eslint-enable */
                row[j] = (
                    <td key={j} style={style} onClick={() => this.toggle(i, j)}>
                        {j === this.state.antX && i === this.state.antY && ant}
                    </td>
                );
            }
            out[i] = <tr key={i}>{row}</tr>;
        }

        return (
            <>
                <div style={{ textAlign: "center" }}>
                    <Button
                        className="list-group-item-danger"
                        style={{
                            display: "inline-block",
                            borderRadius: 20,
                        }}
                        variant="danger"
                        onClick={this.reset}
                        disabled={this.state.playing}
                    >
                        <RotateCw size={24} />
                        Reset
                    </Button>

                    <Button
                        className={
                            this.state.playing
                                ? "list-group-item-danger"
                                : "list-group-item-primary"
                        }
                        style={{
                            display: "inline-block",
                            borderRadius: 20,
                        }}
                        variant={this.state.playing ? "danger" : "primary"}
                        onClick={this.togglePlaying}
                    >
                        {this.state.playing ? (
                            <X size={24} />
                        ) : (
                            <Play size={24} />
                        )}
                        {this.state.playing ? "Stop" : "Play"}
                    </Button>

                    <Button
                        className="list-group-item-info"
                        style={{
                            display: "inline-block",
                            borderRadius: 20,
                        }}
                        variant="info"
                        onClick={this.update}
                        disabled={this.state.playing}
                    >
                        <ArrowRight size={23} />
                        Step
                    </Button>
                </div>
                <br />
                <table
                    className={cx(Styles.table_style)}
                    style={{
                        overflowX: "auto",
                        borderSpacing: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    onKeyDown={this.update}
                    tabIndex={0}
                >
                    <tbody>{out}</tbody>
                </table>
            </>
        );
    }
}
