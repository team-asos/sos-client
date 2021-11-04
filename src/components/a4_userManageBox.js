import React from 'react';

import '../assets/styles/a4_userManageBox.css';

import UserSearchBar from './a4_userSearchBar';

class userManageBox extends React.Component {
  render() {
    return (
      <div className="userManageBox">
        {/* 위, 텍스트 부분 */}
        <div className="userManageUpperBox">
          <div className="userManageUpperBoxChild">
            <p>사용자 관리</p>
          </div>
        </div>
        {/* 아래,  부분 */}
        <div className="userManageBottomBox">
          <div>
            <UserSearchBar />
          </div>
        </div>
      </div>
    );
  }
}

export default userManageBox;
