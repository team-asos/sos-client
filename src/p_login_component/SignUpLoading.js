import React from "react";
import Logo from "../images/logo_transparent.png";
import { Link } from "react-router-dom";

class Loading extends React.Component {
  render() {
    var containerStyle={
      position: 'absolute',
      display:'flex',
      flexDirection: 'column',
      alignItems:'center',
      justifyContent: 'center',

      width: '55vw',
      height: '60vh',
      marginTop: '9%',
      marginLeft: '22%',

      background: '#c4c4c4',
      borderRadius: '44px',
      backgroundImage: `url(${Logo})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '25vw',
    }
    var textStyle={
      position: 'relative',
      fontSize: '1.6em',
      fontWeight:'bolder',
      textAlign:'center'
    }

    return (
      <div style={containerStyle}>
          <p style={textStyle}>회원가입이<br/> 완료되었습니다</p>
          <Link to='/'>
            <button className='Button Login' style={{width:'16vw'}}>로그인하기</button>
          </Link>
      </div>
      
    );
  }
}

export default Loading