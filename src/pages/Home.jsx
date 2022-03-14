import React from 'react';
import { Link } from 'react-router-dom';
import Produtos from './Produtos';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.activegetCategories = this.activegetCategories.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickPesquisa = this.onClickPesquisa.bind(this);

    this.state = {
      categorias: [],
      busca: '',
      resultadoAPI: [],
    };
  }

  componentDidMount() {
    this.activegetCategories();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async onClickPesquisa() {
    const { busca } = this.state;
    const response = await getProductsFromCategoryAndQuery(0, busca);
    this.setState({
      resultadoAPI: response.results,
    });
    // console.log(response.results);
  }

  async activegetCategories() {
    const api = await getCategories();
    this.setState({
      categorias: api,
    });
  }

  render() {
    const { categorias, busca, resultadoAPI } = this.state;
    // const { categorias, busca } = this.state;
    return (
      <div data-testid="home-initial-message">
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.onInputChange }
          name="busca"
          value={ busca }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.onClickPesquisa }
        >
          Pesquisar
        </button>
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">carrinho</button>
        </Link>
        {
          categorias.map((categorie) => (
            <div key={ categorie.id }>
              <label
                htmlFor="categoria"
              >
                <input
                  type="radio"
                  data-testid="category"
                  name="categoria"
                />
                {' '}
                { categorie.name }
                <br />
              </label>
            </div>
          ))
        }
        { resultadoAPI.length
          ? (<Produtos listaProdutos={ resultadoAPI } />)
          : (<p>Nenhum produto foi encontrado</p>) }
      </div>
    );
  }
}

export default Home;
