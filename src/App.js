import React from 'react';
import './App.css';
// import * as api from './services/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Detalhes from './pages/Detalhes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route path="/detalhes/:id" component={ Detalhes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
