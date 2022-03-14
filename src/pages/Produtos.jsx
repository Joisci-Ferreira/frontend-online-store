import React from 'react';
import PropTypes from 'prop-types';

class Produtos extends React.Component {
  render() {
    const { listaProdutos } = this.props;
    return (
      listaProdutos.map((produto, i) => (
        <div key={ i } data-testid="product">
          <p>{ produto.title }</p>
          <img src={ produto.thumbnail } alt="foto produto" />
          <p key={ i }>{ produto.price }</p>
        </div>
      ))
    );
  }
}

export default Produtos;

Produtos.propTypes = {
  listaProdutos: PropTypes.arrayOf(PropTypes.any).isRequired,
};
