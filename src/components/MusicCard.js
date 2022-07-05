import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favoriteSongs: [],
      isChecked: false,
    };
  }

  componentDidMount() {
    this.getFavoriteSongsStorage();
  }

  getFavoriteSongsStorage = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favoriteSongs: result });
  }

  handleChange = async (music) => {
    this.setState({ isLoading: true });

    await addSong(music);

    this.setState((prevState) => {
      const newFavorite = [...prevState.favoriteSongs, music];
      return {
        favoriteSongs: newFavorite,
        isLoading: false,
        isChecked: true,
      };
    });
  }

  render() {
    const { isLoading, isChecked, favoriteSongs } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const favorite = favoriteSongs.some((song) => song.trackId === trackId);

    return (
      <div>
        { isLoading
          ? <Loading />
          : (
            <div>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="checkbox">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  checked={ isChecked || favorite }
                  value={ trackId }
                  onChange={ () => this.handleChange(music) }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
