//지금 당장은 불필요
import React, { useState, useEffect } from 'react';
import Row from './a5_Row';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props),
    };
  }

  render() {
    let rows = this.state.rows.map((row, index) => {
      return <Row cells={row} key={index} />;
    });
    return <div className="board">{rows}</div>;
  }
}
export default Board;
