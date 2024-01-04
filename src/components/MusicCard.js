import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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

  componentWillUnmount() {
    this.setState = () => false;
  }

  getFavoriteSongsStorage = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favoriteSongs: result });
  }

  handleChange = async ({ target }) => {
    const { music } = this.props;

    if (!target.checked) {
      this.setState({ isLoading: true });
      await removeSong(music);

      const result = await getFavoriteSongs();
      this.setState({
        favoriteSongs: result,
        isChecked: false,
        isLoading: false,
      });
      return;
    }

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
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape().isRequired,
};

export default MusicCard;
