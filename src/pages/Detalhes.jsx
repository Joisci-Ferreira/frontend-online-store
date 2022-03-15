import React from 'react';
import propTypes from 'prop-types';
import { getProductsId } from '../services/api';

class Detalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultadoApi = await getProductsId(id);
    this.setState({
      produto: resultadoApi,
    });
    console.log(resultadoApi);
  }

  render() {
    const { produto } = this.state;
    return (
      <div>
        <h2
          data-testid="product-detail-name"
        >
          { `${produto.title} - R$${produto.price}` }
        </h2>
        <img src={ produto.thumbnail } alt={ produto.title } />
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
