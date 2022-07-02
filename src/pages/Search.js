import React, { Component } from 'react';

import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ artist: target.value });
  }

  render() {
    const { artist } = this.state;
    const minLength = 2;
    const isDisabled = artist.length < minLength;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Digitet o nome do artistta"
            value={ artist }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Procurar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
