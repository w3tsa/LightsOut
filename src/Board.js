import React, { Component } from "react";
import "./styles.css";

import Cell from "./Cell";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }

      board.push(row);
    }
    return board;
  }

  flipsCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      if (y >= 0 && y < ncols && x >= 0 && x < nrows) {
        board[x][y] = !board[x][y];
      }
    }

    flipCell(x, y);
    flipCell(x, y - 1); //Left
    flipCell(x, y + 1); //Rigt
    flipCell(x - 1, y); //up
    flipCell(x + 1, y); //down

    let hasWon = board.every((row) => row.every((cell) => !cell));
    console.log(hasWon);
    this.setState({ board: board, hasWon: hasWon });
  }

  render() {
    // if (this.state.hasWon) {
    //   return (
    //     <div className="winner">
    //       <span className="neon-orange">You</span>
    //       <span className="neon-blue">Win!</span>
    //     </div>
    //   );
    // }

    let tblBoard = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            flipsCellsAroundMe={() => this.flipsCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={x}>{row}</tr>);
    }
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">You</span>
            <span className="neon-blue">Win!</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out!</div>
            </div>

            <table className="Board">
              <tbody>{tblBoard}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
