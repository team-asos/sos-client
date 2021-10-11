import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./p_login_component/Login";
import SignUp from "./p_login_component/SignUp";
import Loading from "./p_login_component/Loading";
import MainPage from "./p_main_component/MainPage";
import SignUpLoading from './p_login_component/SignUpLoading';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/loading" component={Loading} />
          <Route path="/main" component={MainPage} />
          <Route path="/sign-up-loading" component={SignUpLoading} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;