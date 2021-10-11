import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/1_loginPage";
import SignUp from "./pages/1_signupPage";
import Loading from "./pages/1_loadingPage";
import SignUpLoading from "./pages/1_signuploadingPage";
import MainPage from "./pages/2_mainPage";


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