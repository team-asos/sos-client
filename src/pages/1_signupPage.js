import React from 'react';

import '../assets/styles/1_signupPage.css'
import '../assets/styles/1_containerStyle.css'

import * as MdIcon from 'react-icons/md';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  isUserAdmin() {
    this.setState({ disabled: !this.state.disabled });
  }
  render() {
    return (
      <div className="container register">
        <div className="upper">
          <Link to="/">
            <MdIcon.MdArrowBackIos className="goBackIcon" size={20} />
          </Link>
          <p>회원 가입</p>
          <div className="checkbox_admin">
            <label>
              <input type="checkbox" onChange={this.isUserAdmin.bind(this)} />
              저는 관리자입니다
            </label>
          </div>
        </div>

        <div className="bottom">
          <div className="column">
            <div>
              <label>이메일</label>
              <input
                type="text"
                className="form-control"
                placeholder="회사 이메일을 입력해주세요"
              />
            </div>
            <div>
              <label>이름</label>
              <input type="text" className="form-control" placeholder="이름" />
            </div>
          </div>

          <div className="column">
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                className="form-control"
                placeholder="대소문자와 숫자를 포함한 8~12자리"
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                className="form-control"
                placeholder="비밀번호 확인"
              />
            </div>
          </div>

          <div className="column">
            <div>
              <label>전화번호</label>
              <input
                type="text"
                className="form-control"
                placeholder="- 를 제외하고 입력하세요"
              />
            </div>
            <div>
              <label>부서</label>
              <input
                type="text"
                className="form-control"
                placeholder="부서"
                disabled={this.state.disabled ? 'disabled' : ''}
              />
            </div>
          </div>

          <div className="column">
            <div>
              <label>직급</label>
              <input
                type="text"
                className="form-control"
                placeholder="직급"
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              {/* <Select className="position" options={positionList}/> */}
            </div>
            <div>
              <button className="registerButton">가입</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
