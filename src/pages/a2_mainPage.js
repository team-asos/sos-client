//삭제해도 될 듯하다
import * as React from 'react';
import '../assets/styles/a2_mainPage.css';
import NavBox from '../components/a2_navBox';
import NotificationBox from '../components/a2_notificationBox';
import FunctionBox from '../components/a2_functionBox';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <div>
          <NavBox />
        </div>
        <div>
          <NotificationBox />
        </div>
        <div>
          <FunctionBox />
        </div>
      </div>
    );
  }
}

export default MainPage;
