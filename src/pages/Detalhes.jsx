import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsId } from '../services/api';

class Detalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
    };
    this.activeGetProductsId = this.activeGetProductsId.bind(this);
    this.ClickButton = this.ClickButton.bind(this);
  }

  async componentDidMount() {
    this.activeGetProductsId();
  }

  async activeGetProductsId() {
    const { match: { params: { id } } } = this.props;
    const resultadoApi = await getProductsId(id);
    this.setState({
      produto: resultadoApi,
    });
  }

  ClickButton() {
    const { produto } = this.state;
    const requestResult = localStorage.getItem('product');
    const requestResultJSON = JSON.parse(requestResult);
    const validateJSON = requestResultJSON === null ? '' : requestResultJSON;
    const resultJSON = JSON.stringify([...validateJSON, produto]);
    localStorage.setItem('product', resultJSON);
  }

  render() {
    const { produto: { title, price, thumbnail, attributes } } = this.state;
    const result = attributes === undefined ? (<p>carregando</p>) : (attributes
      .map((attribute, id) => (
        <li key={ id }>{ `${attribute.name} - ${attribute.value_name}` }</li>)));
    return (
      <div>
        <h2
          data-testid="product-detail-name"
        >
          { `${title} - R$${price}` }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <ul>
          {result}
        </ul>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.ClickButton }
        >
          Adicionar ao carrinho
        </button>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">carrinho</button>
        </Link>
      </div>
    );
  }
}

Detalhes.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Detalhes;
