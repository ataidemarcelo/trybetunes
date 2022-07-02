import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) return <Loading />;

    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <h2 data-testid="header-user-name">
          { user.name }
        </h2>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
