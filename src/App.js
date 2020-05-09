import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from "./pages/LoginScreen/LoginScreen.js";
import Home from "./pages/Home/Home.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={LoginScreen} />
      </div>
    </Router>
  );
}

export default App;
