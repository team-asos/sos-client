import React from 'react';
import '../assets/styles/a4_userDetailBox.css';

export default function userDetailBox(row) {
  return (
    <div className="userDetailBox">
      {/* 위, 텍스트 부분 */}
      <div className="userDetailUpperBox">
        <div className="userDetailUpperBoxChild">
          <p>사용자 관리</p>
        </div>
      </div>
      {/* 아래,  부분 */}
      <div className="userDetailBottomBox">
        <div>
          <h1>Hello world</h1>
        </div>
      </div>
    </div>
  );
}
