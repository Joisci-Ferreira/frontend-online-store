import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsId } from '../services/api';

class Detalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
      endereco: '',
      nota: '',
      texto: '',
      test: [{
        endereco: '',
        nota: '',
        texto: '',
      }],
    };
    this.activeGetProductsId = this.activeGetProductsId.bind(this);
    this.ClickButton = this.ClickButton.bind(this);
    this.theOnChange = this.theOnChange.bind(this);
    this.ClickSubmit = this.ClickSubmit.bind(this);
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

  theOnChange({ target }) {
    if (target.name === 'email') {
      this.setState({ endereco: target.value });
    } else if (target.name === 'radio') {
      this.setState({ nota: target.value });
    } else if (target.name === 'text') {
      this.setState({ texto: target.value });
    }
  }

  ClickSubmit() {
    const { match: { params: { id } } } = this.props;
    const { endereco, nota, texto } = this.state;
    const result = {
      email: endereco,
      avaliacao: nota,
      comentario: texto,
    };
    this.setState((a) => ({ test: [...a.test, result] }));
    const requestResult = localStorage.getItem(id);
    const requestResultJSON = JSON.parse(requestResult);
    const validateJSON = requestResultJSON === null ? '' : requestResultJSON;
    const encapsulate = [...validateJSON, result];
    const resultJSON = JSON.stringify(encapsulate);
    console.log(resultJSON);
    localStorage.setItem(id, resultJSON);
  }

  render() {
    const { produto: { title, price, thumbnail, attributes } } = this.state;
    const { match: { params: { id } } } = this.props;
    const result = attributes === undefined ? (<p>carregando</p>) : (attributes
      .map((attribute, i) => (
        <li key={ i }>{ `${attribute.name} - ${attribute.value_name}` }</li>)));
    const local = localStorage.getItem(id);
    const localJSON = JSON.parse(local);
    const validateJSON = localJSON === null ? <p>nenhuma avaliação</p> : localJSON
      .map((e, i) => (
        <div key={ i }>
          <p>{ e.email }</p>
          <p>{ e.avaliacao }</p>
          <p>{ e.comentario }</p>
        </div>
      ));
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
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="seu email"
            name="email"
            onChange={ this.theOnChange }
          />
          <label htmlFor="radio" isRequired>
            <input
              type="radio"
              data-testid="1-rating"
              name="radio"
              value="1"
              onChange={ this.theOnChange }
            />
            <input
              type="radio"
              data-testid="2-rating"
              name="radio"
              value="2"
              onChange={ this.theOnChange }
            />
            <input
              type="radio"
              data-testid="3-rating"
              name="radio"
              value="3"
              onChange={ this.theOnChange }
            />
            <input
              type="radio"
              data-testid="4-rating"
              name="radio"
              value="4"
              onChange={ this.theOnChange }
            />
            <input
              type="radio"
              data-testid="5-rating"
              name="radio"
              value="5"
              onChange={ this.theOnChange }
            />
            <input
              type="text"
              data-testid="product-detail-evaluation"
              name="text"
              placeholder="algo sobre o produto"
              onChange={ this.theOnChange }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.ClickSubmit }
          >
            Enviar
          </button>
        </form>
        { validateJSON }
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
