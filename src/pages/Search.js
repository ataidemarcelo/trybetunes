import React, { Component } from 'react';

import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from '../components/Loading';

import Header from '../components/Header';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      // isLoading: true,
      albumList: undefined,
      showInput: true,
      artistName: undefined,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ artist: target.value });
  }

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      showInput: false,
      artistName: artist,
    });

    const results = await searchAlbumsAPI(artist);
    this.setState({
      albumList: [...results],
      showInput: true,
      artist: '',
    });
  }

  render() {
    const { artist, showInput, albumList, artistName } = this.state;
    const minLength = 2;
    const isDisabled = artist.length < minLength;

    return (
      <div data-testid="page-search">
        <Header />

        { showInput
          ? (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Digite o nome do artista"
                value={ artist }
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
          ) : <Loading />}

        { artistName
          && (
            <h3>
              Resultado de álbuns de:
              {' '}
              { artistName }
            </h3>
          )}

        {albumList && (
          albumList.length === 0
            ? 'Nenhum álbum foi encontrado'
            : albumList.map((album) => (
              <CardAlbum key={ album.collectionId } album={ album } />
            ))
        )}
      </div>
    );
  }
}

export default Search;
