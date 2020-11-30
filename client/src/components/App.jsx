import React, { Component } from 'react';
import { Route, Switch, Router, BrowserRouter } from 'react-router-dom';
import Home from './Home.jsx';
import StockPage from './StockPage/StockPage.jsx';
// import '/../../client/dist/style.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/stock/:key" component={StockPage} />
      </div>
    </BrowserRouter>
  )
}

export default App;
