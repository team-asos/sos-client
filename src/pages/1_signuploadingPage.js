import React from "react";
import { Link } from "react-router-dom";

import '../assets/styles/1_containerStyle.css'
import '../assets/styles/1_signuploadingPage.css'

class Loading extends React.Component {
  render() {
    return (
      <div className="container signuploading">
          <p className="registerCompleteText">회원가입이<br/> 완료되었습니다</p>
          <Link to='/'>
            <button className='Button Login' style={{width:'16vw'}}>로그인하기</button>
          </Link>
      </div>
    );
  }
}

export default Loading