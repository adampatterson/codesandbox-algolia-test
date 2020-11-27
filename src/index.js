import React from 'react';
import ReactDOM from 'react-dom';
import SearchRouter from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Route path="/" component={SearchRouter} />
  </Router>,
  document.getElementById('root')
);
