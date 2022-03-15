import React from 'react';
import propTypes from 'prop-types';
import { getProductsId } from '../services/api';

class Detalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
    };
    this.activeGetProductsId = this.activeGetProductsId.bind(this);
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
    console.log(resultadoApi);
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
