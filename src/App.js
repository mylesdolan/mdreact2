import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Insta} from './FaceBook/Insta';
import logo from './logo.svg';
import './App.css';
import {Fb} from './FaceBook/fb';
function App() {
  return (
      <Router>
    <div className="App">
      <Route path="/Insta" component={Insta} />
      <Fb/>


    </div>
      </Router>
  );
}

export default App;
