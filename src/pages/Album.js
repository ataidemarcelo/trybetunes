import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: undefined,
    };
  }

  componentDidMount() {
    this.fetchMusicsAPI();
  }

  fetchMusicsAPI = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = await getMusics(id);
    this.setState({ album: result });
  }

  render() {
    const { album } = this.state;

    if (!album) return <Loading />;

    const [collection, ...musics] = album;
    const { artistName, collectionName, artworkUrl100 } = collection;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img src={ artworkUrl100 } alt="" />
          <p data-testid="album-name">
            { collectionName }
          </p>
          <p data-testid="artist-name">
            {' '}
            { artistName }
          </p>
        </div>
        {musics.map((music) => (
          <MusicCard key={ music.trackId } music={ music } />
        ))}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
