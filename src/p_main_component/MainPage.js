import React from 'react';
import NavBar from './components/NavBar.js';
import NotificationBar from './components/NotificationBar.js';
import CurrentSeat from './components/CurrentSeat.js';

class MainPage extends React.Component {
  render(){
    return (
        <div>
          <NotificationBar/>
          <NavBar/>
          <CurrentSeat/>
        </div>
    );
  }

}

export default MainPage;
