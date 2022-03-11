import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <input type="text" />
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">carrinho</button>
        </Link>
      </div>
    );
  }
}

export default Home;
