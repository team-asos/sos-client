import React from 'react';
import Logo from '../images/logo_transparent.png';
import { SpinnerCircular } from 'spinners-react';
class Loading extends React.Component {
  render() {
    var containerStyle = {
      position: 'absolute',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    var spinnerStyle = {
      position: 'absolute',
    };
    var textStyle = {
      position: 'absolute',
      textAlign: 'center',
      fontSize: '1.9em',
      fontWeight: 'bolder',
    };
    return (
      <div style={containerStyle}>
        <SpinnerCircular
          size={300}
          thickness={50}
          speed={101}
          color="#c00000"
          style={spinnerStyle}
        />
        <p style={textStyle}>
          환영합니다. <br />
          홍길동 부장님
        </p>
      </div>
    );
  }
}

export default Loading;
