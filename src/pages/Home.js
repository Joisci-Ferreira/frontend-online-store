import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <input type="text" />
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
      </div>
    );
  }
}

export default Home;
