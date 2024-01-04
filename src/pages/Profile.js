import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
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

    return (
      <>
        <Header />
        {!user
          ? <Loading />
          : (
            <div data-testid="page-profile">
              <p>Profile</p>
              <p>{ user.name }</p>
              <p>{ user.email }</p>
              <p>{ user.description }</p>
              <img data-testid="profile-image" src={ user.image } alt="" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </>
    );
  }
}

export default Profile;
