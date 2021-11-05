import React, { useState } from 'react';
import { Tabs, Tab, Form, Col, Row } from 'react-bootstrap';

import Cell from './a5_Cell';
import '../assets/styles/a5_seatBoard.css';

export default class SeatBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 0, //0 : !isOccupied, 1: isOccupied
      rows: 20,
      columns: 35,
      clickedRow: -1,
      clickedColumn: -1,
    };
  }

  //보드 만들기
  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.state.rows; i++) {
      board.push([]);
      for (let j = 0; j < this.state.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          status: 0,
        });
      }
    }
    console.table(board);
    return board;
  };

  createRow = row => {
    console.log('createRow called');
    let cells = row.map((data, index) => {
      return <Cell key={index} data={data} clickCell={this.clickCell} />;
    });
    return <div className="row">{cells}</div>;
  };

  //cell(좌석, 회의실, 시설)을 클릭할 때
  clickCell = cell => {
    console.log(cell.y, cell.x, cell.status);

    if (cell.status === 0) {
      cell.status = 1;

      this.setState({
        clickedRow: cell.y,
        clickedColumn: cell.x,
      });

      console.log(
        'It can be clicked, ',
        cell.status,
        this.state.clickedRow,
        this.state.clickedColumn,
      );
    } else {
      console.log('It already clicked');
    }
  };

  render() {
    const newRows = this.createBoard().map(row => this.createRow(row));
    return (
      <div className="seatBoard">
        <div className="seatBoardLeft">
          <div className="board">{newRows}</div>
        </div>

        <div className="seatBoardRight">
          {/* 추후에 컴포넌트로 분리 예정, 일단은 그냥 함. */}
          <div>
            <Tabs
              defaultActiveKey="좌석"
              id="uncontrolled-tab-example"
              variant="tabs"
              className="mb-3"
            >
              <Tab eventKey="좌석" title="좌석">
                <div className="tabContent">
                  <p>
                    좌석 위치 : ( {this.state.clickedRow},
                    {this.state.clickedColumn} )
                  </p>
                  <p>
                    좌석 번호 :{' '}
                    <input type="text" placeholder="숫자로 입력하세요." />
                  </p>
                  <button className="addBtn">추가하기</button>
                </div>
              </Tab>
              <Tab eventKey="회의실" title="회의실">
                <div className="tabContent">
                  <p>
                    회의실 위치 : ( {this.state.clickedRow},
                    {this.state.clickedColumn} )
                  </p>
                  <p>
                    회의실 번호 :{' '}
                    <input type="text" placeholder="숫자로 입력하세요." />
                  </p>
                  <p>
                    <Form.Select
                      className="me-sm-1"
                      id="inlineFormCustomSelect"
                      style={{ width: '70%' }}
                    >
                      ß<option value="0">회의실 인원 수</option>
                      <option value="1">4</option>
                      <option value="2">8</option>
                      <option value="3">12</option>
                    </Form.Select>
                  </p>
                  <button className="addBtn"> 추가하기</button>
                </div>
              </Tab>
              <Tab eventKey="시설" title="시설">
                <div className="tabContent">
                  <p>시설 위치 : </p>
                  <Form.Group
                    as={Row}
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  >
                    <Form.Label as="legend" column>
                      시설 타입
                    </Form.Label>
                    <Col sm={20}>
                      <Form.Check
                        type="radio"
                        label="에어컨"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                      />
                      <Form.Check
                        type="radio"
                        label="화장실"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                      />
                      <Form.Check
                        type="radio"
                        label="엘레베이터"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                      />
                    </Col>
                  </Form.Group>
                  <button className="addBtn"> 추가하기</button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
