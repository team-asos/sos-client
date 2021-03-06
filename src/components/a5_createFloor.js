import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const CreateFloor = () => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const inputName = e => {
    setName(e.target.value.replace('-', '지하'));
  };
  const inputWidth = e => {
    setWidth(e.target.value);
  };
  const inputHeight = e => {
    setHeight(e.target.value);
  };

  const createClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
          width: Number(width),
          height: Number(height),
        }),
      },
    );
    if (result.status === 201) {
      alert('층이 생성되었습니다.');
      window.location.href = '/seat-management';
    }
  };
  return (
    <div>
      <Modal.Body>
        <div className="createFloorModal">
          <div style={{ width: '100%' }}>
            <div
              style={{
                width: '85%',
                height: 'min-content',
                marginBottom: '3%',
                textAlign: 'center',
                borderBottom: '1px dashed #c00000',
              }}
            >
              <p
                style={{
                  fontSize: 'small',
                  fontStyle: 'italic',
                  color: 'gray',
                }}
              >
                지하 층을 생성하고 싶으면 -(숫자+층)으로 입력해주세요. <br />
                예) 지하 1층 -&#62; -1층
              </p>
            </div>

            <div style={{ width: '100%' }}>
              <label>층 이름 :</label>
              <input
                className="floorInputForm"
                placeholder=" (숫자+층)으로 입력해주세요. 예) 1층"
                onChange={inputName}
              />
            </div>
            <div>
              <label>층의 가로 길이 : </label>
              <input
                className="floorInputForm"
                placeholder=" 숫자로 입력해주세요. 예) 30"
                onChange={inputWidth}
              />
            </div>
            <div>
              <label>층의 세로 길이 : </label>
              <input
                className="floorInputForm"
                placeholder=" 숫자로 입력해주세요. 예) 30"
                onChange={inputHeight}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="floorControlButton" onClick={createClickHandler}>
          생성하기
        </button>
      </Modal.Footer>
    </div>
  );
};
export default CreateFloor;
