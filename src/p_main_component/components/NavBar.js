import React from 'react';
import Logo from '../../images/logo.png';
import AppBox from './AppBox';
import DateTimeBox from './DateTimeBox';

class NavBar extends React.Component {
  render(){
    //스타일 적용
    var navBarStyle={
      position:"absolute",
      width: "86px",
      height: "100vh",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "10px"
    }
    var logoBoxStyle={
      position:"relative",
      height: "10vh",
      borderRadius: "2px",
    
      background:'black',
      backgroundImage: `url(${Logo})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '70px',
    }
    var appBoxStyle={
      position:"relative",
      height: "70vh",
      backgroundColor: "#858585"
    }
    var dateBoxStyle={
      position:"relative",
      display:"block",
      paddingTop: "5vh",
      height: "20vh",
      bottom: 0,
      backgroundColor: "#820101",
      borderRadius: "2px"
    };

    return (
      <div className="navBar" style={navBarStyle}>
        <div className="logoBox" style={logoBoxStyle}>
        </div>
        <div className="appBox" style={appBoxStyle}>
          <AppBox/>
        </div>
        <div className="dateBox" style={dateBoxStyle}>
          <DateTimeBox/>
        </div>
      </div>
    
    );
  }

}

export default NavBar;
