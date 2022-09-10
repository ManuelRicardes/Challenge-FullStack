// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter>
      <Switch>
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
    </div>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
