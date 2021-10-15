import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/1_loginPage';
import SignUp from './pages/1_signupPage';
import Loading from './pages/1_loadingPage';
import SignUpLoading from './pages/1_signuploadingPage';
import MainPage from './pages/a2_mainPage';
import NotificationPage from './pages/a3_notificationPage';
import UserManagePage from './pages/a4_userManagePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/loading" component={Loading} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-up-loading" component={SignUpLoading} />

          <Route path="/main" component={MainPage} />
          <Route path="/notification" component={NotificationPage} />
          <Route path="/seat-management" component={UserManagePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
