import React, { Component } from "react";

import "../index.css";

import Header from "./Header.js";
import Buttons from "./Buttons.js";
import FlippedTiles from "./FlippedTiles.js";
import Ant from "./Ant.js";
import Highscore from "./Highscore.js";
import Footer from "./Footer.js";

import { updateHighScore, getHighScore } from "../util/highscore";

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
        this.end = this.end.bind(this);
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
                let r = Math.random();
                let color;

                if (r < 0.5) color = "white";
                else if (r < 0.6) color = "red";
                else color = "grey";
                grid[i][j] = color;
                initial[i][j] = color;
            }
        }
        initial[0][0] = grid[0][0] = "white";
        initial[size - 1][size - 1] = grid[size - 1][size - 1] = "green";

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
        // init localstorage on first play
        if (getHighScore() === null) {
            updateHighScore(Infinity);
        }
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
            if (this.flipped_tiles < getHighScore()) {
                updateHighScore(this.flipped_tiles);
            }
            this.end("You win! :)");
        } else if (this.state.grid[antY][antX] === "red") {
            this.end("You lose! :(");
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

        if (i === 0 && j === 0) {
            let antDir = (this.state.antDir + 1) % 4;
            this.setState({ antDir });
            return;
        }

        let grid = this.state.grid;
        let color = grid[i][j];
        if (color === "white") color = "grey";
        else if (color === "grey") color = "white";
        grid[i][j] = color;

        this.setState({
            grid,
        });
    }

    end(msg) {
        alert(msg);
        this.togglePlaying();
    }

    render() {
        if (this.state.grid === null || this.state.initial === null)
            return "Loading...";

        let out = [];

        this.flipped_tiles = 0;
        for (let i = 0; i < this.state.size; i++) {
            let row = [];
            for (let j = 0; j < this.state.size; j++) {
                let style = {
                    width: 50,
                    height: 50,
                    border: "1px solid black",
                    backgroundColor: this.state.grid[i][j],
                };

                row[j] = (
                    <td
                        key={j}
                        id="table"
                        style={style}
                        onClick={() => this.toggle(i, j)}
                    >
                        {j === this.state.antX && i === this.state.antY && (
                            <Ant antDir={this.state.antDir} />
                        )}
                    </td>
                );

                if (this.state.grid[i][j] !== this.state.initial[i][j]) {
                    this.flipped_tiles += 1;
                }
            }
            out[i] = <tr key={i}>{row}</tr>;
        }

        return (
            <>
                <Header />
                <div className="user-input-area">
                    <Buttons
                        init={this.init}
                        reset={this.reset}
                        togglePlaying={this.togglePlaying}
                        update={this.update}
                        playing={this.state.playing}
                    />
                    <FlippedTiles flippedTiles={this.flipped_tiles} />
                </div>

                <table className="table_style">
                    <tbody>{out}</tbody>
                </table>

                <Highscore />
                <Footer />
            </>
        );
    }
}
