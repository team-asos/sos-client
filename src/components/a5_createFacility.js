import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const CreateFacility = ({ clickedColumn, clickedRow }) => {
  return (
    <div className="tabContent">
      <p>
        시설 위치 : ( {clickedRow},{clickedColumn} )
      </p>
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
  );
};

export default CreateFacility;
