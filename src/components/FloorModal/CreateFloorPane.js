import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';

export const CreateFloor = () => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const inputName = e => {
    setName(e.target.value);
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
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
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
        <div className="floor-modal-pane">
          <div>
            <label>층 이름 : </label>
            <input
              className="floor-modal-input"
              placeholder=" (숫자+층)으로 입력해주세요. 예) 1층"
              onChange={inputName}
            />
          </div>
          <div>
            <label>층의 가로 길이 : </label>
            <input
              className="floor-modal-input"
              placeholder=" 숫자로 입력해주세요. 예) 30"
              onChange={inputWidth}
            />
          </div>
          <div>
            <label>층의 세로 길이 : </label>
            <input
              className="floor-modal-input"
              placeholder=" 숫자로 입력해주세요. 예) 30"
              onChange={inputHeight}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="floor-modal-button" onClick={createClickHandler}>
          생성하기
        </button>
      </Modal.Footer>
    </div>
  );
};
