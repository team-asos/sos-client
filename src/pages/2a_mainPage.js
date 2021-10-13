import * as React from 'react';
import '../assets/styles/2a_mainPage.css'
import NavBox from '../components/2a_navBox'
import NotificationBox from '../components/2a_notificationBox';
import FunctionBox from '../components/2a_functionBox'

class MainPage extends React.Component {
  render(){
    return (
        <div className="main">
          <div><NavBox/></div>
          <div><NotificationBox/></div>
          <div><FunctionBox/></div>
        </div>
    );
  }
}

export default MainPage;
