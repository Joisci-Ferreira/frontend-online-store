import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Produtos extends React.Component {
  render() {
    const { listaProdutos } = this.props;
    console.log(listaProdutos);
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
        </div>
      ))
    );
  }
}

export default Produtos;

Produtos.propTypes = {
  listaProdutos: PropTypes.arrayOf(PropTypes.any).isRequired,
};
