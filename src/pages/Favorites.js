import React, { Component } from 'react';

import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  updateStorageAndState = async (music) => {
    await removeSong(music);
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        {favorites.map((music) => (
          <div
            key={ music.trackId }
            onClick={ () => this.updateStorageAndState(music) }
            aria-hidden="true"
          >
            <MusicCard music={ music } />
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
