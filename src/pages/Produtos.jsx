import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Produtos extends React.Component {
  constructor() {
    super();
    this.ClickButton = this.ClickButton.bind(this);
  }

  ClickButton({ target }) {
    const { listaProdutos } = this.props;
    const requestResult = localStorage.getItem('product');
    const requestResultJSON = JSON.parse(requestResult);
    const validateJSON = requestResultJSON === null ? '' : requestResultJSON;
    const result = listaProdutos.filter((e) => e.title === target.name);
    const resultJSON = JSON.stringify([...validateJSON, result[0]]);
    localStorage.setItem('product', resultJSON);
  }

  render() {
    const { listaProdutos } = this.props;
    return (
      listaProdutos.map((produto, i) => (
        <div key={ i } data-testid="product">
          <p>{ produto.title }</p>
          <img src={ produto.thumbnail } alt="foto produto" />
          <p>{ produto.price }</p>
          <Link to={ `/detalhes/${produto.id}` }>
            <button
              data-testid="product-detail-link"
              type="button"
            >
              Ver detalhes
            </button>
          </Link>
          <button
            type="button"
            data-testid="product-add-to-cart"
            onClick={ this.ClickButton }
            name={ produto.title }
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))
    );
  }
}

export default Produtos;

Produtos.propTypes = {
  listaProdutos: PropTypes.arrayOf(PropTypes.any).isRequired,
};
