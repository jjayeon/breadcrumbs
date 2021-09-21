import React, { Component } from "react";

export default class Game extends Component {
    constructor(props) {
        super(props);

        let size = 6;

        let grid = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = Math.random() < 0.2 ? "grey" : "white";
            }
        }

        let antX = 0,
            antY = 0,
            antDir = 0;

        /*
          antDir can be 0, 1, 2, or 3, corresponding to N, E, S, W.
        */

        this.state = {
            size,
            grid,
            antX,
            antY,
            antDir,
        };

        this.update = this.update.bind(this);
    }

    update() {
        let color = this.state.grid[this.state.antX][this.state.antY];
        let antDir = this.state.antDir;
        let antX = this.state.antX;
        let antY = this.state.antY;

        /* eslint-disable */
        switch (color) {
            case "white":
                antDir = (antDir + 1) % 4;
                break;
            case "grey":
                antDir = (antDir + 4 - 1) % 4;
                break;
        }

        switch (antDir) {
            case 0:
                antY -= 1;
                break;
            case 1:
                antX += 1;
                break;
            case 2:
                antY += 1;
                break;
            case 3:
                antX -= 1;
                break;
        }
        /* eslint-enable */

        this.setState({
            antDir,
            antX,
            antY,
        });
        console.log("update");
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
                row[j] = (
                    <td key={j} style={style}>
                        {i === this.state.antX && j === this.state.antY && "A"}
                    </td>
                );
            }
            out[i] = <tr key={i}>{row}</tr>;
        }

        return (
            <table
                style={{ overflowX: "auto", borderSpacing: 0 }}
                onClick={this.update}
            >
                <tbody>{out}</tbody>
            </table>
        );
    }
}
