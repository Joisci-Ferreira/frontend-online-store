import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    const resultStorage = localStorage.getItem('product');
    const resultStorageJSON = JSON.parse(resultStorage);
    const contagem = resultStorageJSON.length;
    const theMAP = resultStorageJSON.map((e, i) => (
      <div key={ i }>
        <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
      </div>
    ));
    console.log(contagem);
    return (
      <div>
        { contagem > 0 ? (
          <h2 data-testid="shopping-cart-product-quantity">{ contagem }</h2>
        ) : (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        )}
        { contagem > 0 ? theMAP : (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
