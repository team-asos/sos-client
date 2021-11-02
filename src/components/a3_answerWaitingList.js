import React from 'react';

import '../assets/styles/a3_answerWaitingList.css';

class answerWaitingList extends React.Component {
  render() {
    return (
      <div className="answerWaitingList">
        <div className="answerWaitingListLeft">
          <ul>
            <li>
              <h5>회원 정보 수정에 관하여</h5>
              <h6>2021/11/05 12:25, 홍길동</h6>
            </li>
            <li>
              <h5>회원 정보 수정에 관하여</h5>
              <h6>2021/11/05 12:25, 홍길동</h6>
            </li>
            <li>
              <h5>회원 정보 수정에 관하여</h5>
              <h6>2021/11/05 12:25, 홍길동</h6>
            </li>
            <li>
              <h5>회원 정보 수정에 관하여</h5>
              <h6>2021/11/05 12:25, 홍길동</h6>
            </li>
            <li>
              <h5>회원 정보 수정에 관하여</h5>
              <h6>2021/11/05 12:25, 홍길동</h6>
            </li>
          </ul>
        </div>
        <div className="answerWaitingListRight">Right</div>
      </div>
    );
  }
}

export default answerWaitingList;
