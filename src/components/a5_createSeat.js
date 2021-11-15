import React from 'react';

const CreateSeat = ({ clickedColumn, clickedRow }) => {
  return (
    <div className="tabContent">
      <p>
        좌석 위치 : ( {clickedRow},{clickedColumn} )
      </p>
      <p>
        좌석 번호 : <input type="text" placeholder="숫자로 입력하세요." />
      </p>
      <button className="addBtn">추가하기</button>
    </div>
  );
};

export default CreateSeat;
