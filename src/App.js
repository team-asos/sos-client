import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//공통 페이지
import Login from './pages/1_loginPage';
import SignUp from './pages/1_signupPage';
import Loading from './pages/1_loadingPage';
import SignUpLoading from './pages/1_signuploadingPage';
import LoginNoti from './pages/1_loginNotificationPage';

//사용자 페이지
import RoomReservationPage from './pages/u2_roomReservationPage';
import RoomCheckPage from './pages/u1_roomCheckPage';
import InquirePage from './pages/u3_inquirePage';
import UserMyPage from './pages/u4_myPage';
import SeatReservationPage from './pages/u5_seatPage';
import MyInfo from './components/u4_myInfoForm';

//관리자 페이지
import NotificationPage from './pages/a3_notificationPage';
import UserManagePage from './pages/a4_userManagePage';
import SeatManagePage from './pages/a5_seatManagePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />

          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/loading" component={Loading} />
          <Route path="/login-noti" component={LoginNoti} />
          <Route path="/sign-up-loading" component={SignUpLoading} />

          <Route
            path="/room-reservation/:idx"
            component={RoomReservationPage}
          />
          <Route path="/room-check" component={RoomCheckPage} />
          <Route path="/inquire" component={InquirePage} />
          <Route path="/user-mypage" component={UserMyPage} />
          <Route path="/user-mypage-myinfo" component={MyInfo} />
          <Route path="/seat-reservation" component={SeatReservationPage} />

          <Route exact path="/user-management" component={UserManagePage} />
          <Route path="/notification" component={NotificationPage} />
          <Route path="/seat-management" component={SeatManagePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
