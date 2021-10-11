import React from 'react';

class NotificationBar extends React.Component {
  render(){
    var barStyle={
      position:"absolute",
      top:"21px",
      width:"100%",
      height: "4vh",
      backgroundColor: "#c4c4c4"
    }
    var textStyle={
      textAlign: "center",
      fontWeight: "500",
      fontStyle: "italic",
      fontSize:"small"
    }
    return (
      //숫자 부분은 데이터베이스에서 메세지 개수 받아서 할 예정, 임시로 5로 설정
      <div style={barStyle}>
        <p style={textStyle}> 
        <span style={{color:'#c00000', fontWeight:"1000"}}> 5 </span> 
        개의 읽지 않은 알림이 있습니다.</p>
      </div>
    );
  }
}

export default NotificationBar;
