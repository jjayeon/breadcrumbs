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

        this.state = {
            size: 6,
            grid: null,
            initial: null,
            antX: 0,
            antY: 0,
            antDir: 1,
            playing: false,
        };

        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
        this.toggle = this.toggle.bind(this);
        this.win = this.win.bind(this);

        // this.init();
    }

    componentDidMount() {
        this.init();
    }

    init() {
        let size = this.state.size;

        let grid = [];
        let initial = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            initial[i] = [];
            for (let j = 0; j < size; j++) {
                let color = Math.random() < 0.5 ? "grey" : "white";
                grid[i][j] = color;
                initial[i][j] = color;
            }
        }
        initial[size - 1][size - 1] = "green";
        grid[size - 1][size - 1] = "green";

        let antX = 0,
            antY = 0,
            antDir = 1;

        /*
          antDir can be    0, 1, 2, 3, 
          corresponding to N, E, S, W.
        */

        let playing = false;

        this.setState({
            grid,
            initial,
            antX,
            antY,
            antDir,
            playing,
        });
    }

    reset() {
        let size = this.state.size;
        let grid = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = this.state.initial[i][j];
            }
        }

        this.setState({
            grid,
            antX: 0,
            antY: 0,
            antDir: 1,
            playing: false,
        });
    }

    update() {
        let antDir = this.state.antDir;
        let antX = this.state.antX;
        let antY = this.state.antY;
        let size = this.state.size;

        let bounce = false;

        /*
          antDir can be    0, 1, 2, 3, 
          corresponding to N, E, S, W.
        */

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

    togglePlaying() {
        const playing = this.state.playing;

        if (playing) {
            clearInterval(this.stepInterval);
            this.setState({
                antX: 0,
                antY: 0,
                antDir: 1,
            });
        } else {
            // TODO: Change the speed to a variable adjustable with a slider
            this.stepInterval = setInterval(this.update, 500);
        }

        this.setState({ playing: !playing });
    }

    toggle(i, j) {
        if (this.state.playing) return;

        let grid = this.state.grid;
        let color = grid[i][j];
        if (color === "white") color = "grey";
        else if (color === "grey") color = "white";
        grid[i][j] = color;

        this.setState({
            grid,
        });
    }

    win() {
        alert("you win!");
        this.togglePlaying();
    }

    render() {
        if (this.state.grid === null || this.state.initial === null)
            return "Loading...";

        let out = [];

        let flipped_tiles = 0;
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

                if (this.state.grid[i][j] !== this.state.initial[i][j]) {
                    flipped_tiles += 1;
                }
            }
            out[i] = <tr key={i}>{row}</tr>;
        }

        return (
            <>
                <br />
                <br />
                <br />
                <h1
                    style={{
                        fontFamily: "Inknut Antiqua",
                        textAlign: "center",
                        marginBottom: 5,
                        fontSize: "2.6rem",
                    }}
                >
                    Breadcrumbs
                </h1>
                <h5
                    style={{
                        fontFamily: "Inknut Antiqua",
                        textAlign: "center",
                        marginTop: 0,
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Help keep our ant alive!
                </h5>
                <br />
                <div style={{ textAlign: "center" }}>
                    <Button
                        className="list-group-item-danger"
                        style={{
                            display: "inline-block",
                            borderRadius: 20,
                        }}
                        variant="danger"
                        onClick={this.init}
                        disabled={this.state.playing}
                    >
                        <RotateCw size={24} />
                        &nbsp;&nbsp;New Game&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
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
                        &nbsp;&nbsp;Reset&nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
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
                        &nbsp;&nbsp;{this.state.playing ? "Stop" : "Play"}
                        &nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
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
                        &nbsp;&nbsp;Step&nbsp;
                    </Button>
                    <br />
                    <span>
                        Flipped tiles: {flipped_tiles} (try to get this as low
                        as you can!)
                    </span>
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
                <br />
                <br />
                <br />
                <div
                    className="fixed-bottom shadow-sm"
                    style={{
                        background: "whitesmoke",
                        textAlign: "center",
                        paddingTop: 8,
                        paddingBottom: 10,
                        borderTop: "1px solid #dcdcdc",
                    }}
                >
                    <span
                        style={{
                            fontWeight: "bold",
                            fontFamily: "Inknut Antiqua",
                        }}
                    >
                        Breadcrumbs
                    </span>{" "}
                    by <a href="https://github.com/jjaytheon">@jjaytheon</a>,{" "}
                    <a href="https://github.com/hankc97">@hankc97</a>, and{" "}
                    <a href="https://github.com/mgsium">@mgsium</a>
                </div>
            </>
        );
    }
}
