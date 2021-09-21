import React from "react";

function GridRow() {
    let blocks = [];
    for (let i = 0; i < 100; i++) {
        blocks.push(
            <td
                key={i}
                id={i}
                style={{
                    minWidth: 10,
                    minHeight: 10,
                    width: 10,
                    height: 10,
                    border: "1px solid #c4c4c4",
                }}
            ></td>
        );
    }
    return <tr>{blocks}</tr>;
}

const GameGrid = () => {
    let cells = [];
    for (let i = 100; i > 0; i--) cells.push(<GridRow />);
    console.log(cells);

    return (
        <table style={{ overflowX: "auto", borderSpacing: 0 }}>
            <tbody>{cells}</tbody>
        </table>
    );
};

export default GameGrid;
