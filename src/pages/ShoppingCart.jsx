import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    const resultStorage = localStorage.getItem('product');
    const resultStorageJSON = JSON.parse(resultStorage);
    const contagem = resultStorageJSON !== null ? resultStorageJSON.length : 0;
    const theMAP = resultStorageJSON !== null ? resultStorageJSON.map((e, i) => (
      <div key={ i }>
        <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
      </div>
    )) : null;
    console.log(contagem);
    return (
      <div>
        { contagem !== 0 ? (
          <h2 data-testid="shopping-cart-product-quantity">{ contagem }</h2>
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
