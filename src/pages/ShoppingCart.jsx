import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = { acumullate: 1 };
    this.someButton = this.someButton.bind(this);
  }

  someButton({ target }) {
    // const { acumullate } = this.state;
    if (target.name === 'most') {
      this.setState((estadoAnterior) => ({ acumullate: estadoAnterior.acumullate + 1 }));
    } else {
      this.setState((estadoAnterior) => ({ acumullate: estadoAnterior.acumullate - 1 }));
    }
  }

  render() {
    const { acumullate } = this.state;
    const resultStorage = localStorage.getItem('product');
    const resultStorageJSON = JSON.parse(resultStorage);
    const contagem = resultStorageJSON !== null ? resultStorageJSON.length : 0;
    const theMAP = resultStorageJSON !== null ? resultStorageJSON.map((e, i) => (
      <div key={ i }>
        <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.someButton }
          name="most"
        >
          +
        </button>
        <p>{ acumullate }</p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.someButton }
          name="less"
        >
          -
        </button>
      </div>
    )) : null;
    return (
      <div>
        { contagem !== 0 ? (
          <h2
            data-testid="shopping-cart-product-quantity"
          >
            { (contagem + acumullate) - 1 }
          </h2>
        ) : (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        )}
        { contagem !== null ? theMAP : (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
