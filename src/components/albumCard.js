import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { album } = this.props;
    return (
      <div key={ album.collectionName }>
        <img src={ album.artworkUrl100 } alt="" />
        <p>{ album.artistName }</p>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          { album.collectionName }
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape({
    collectionName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardAlbum;
