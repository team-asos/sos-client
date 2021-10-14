import React from 'react';
import '../assets/styles/3a_messageBox.css';

class MessageBox extends React.Component {
  render() {
    return (
      <div className="messageBox">
        {/* 위, 텍스트 부분 */}
        <div className="messageUpperBox">
          <p>
            알림
            <span className="count total">
              {/* 서버에서 가져올 값, 지금은 임의 지정 */} 5
            </span>
          </p>
        </div>
        {/* 아래, 메세지 부분 */}
        <div className="messageBottomBox">
          <div>
            <button className="messageBtn">
              사용자
              <span className="count user">
                {/* 서버에서 가져올 값, 지금은 임의 지정 */} 2
              </span>
            </button>
            <button className="messageBtn">
              시스템
              <span className="count system">
                {/* 서버에서 가져올 값, 지금은 임의 지정 */} 3
              </span>
            </button>
          </div>
          <div style={{ background: 'pink', width: '85vw' }}>아직이야...</div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
