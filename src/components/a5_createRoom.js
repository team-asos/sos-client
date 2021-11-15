import React from 'react';
import { Form } from 'react-bootstrap';

const CreateRoom = ({ clickedColumn, clickedRow }) => {
  return (
    <div className="tabContent">
      <p>
        회의실 위치 : ( {clickedRow},{clickedColumn} )
      </p>
      <p>
        회의실 번호 : <input type="text" placeholder="숫자로 입력하세요." />
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
  );
};

export default CreateRoom;
