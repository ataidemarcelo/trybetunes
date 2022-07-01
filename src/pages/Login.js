import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleClick = async (user) => {
    this.setState({ isLoading: true });
    await createUser(user);
    this.goToSearch();
  }

  goToSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, isLoading } = this.state;
    const minLength = 3;
    const isDisabled = name.length < minLength;

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isDisabled }
            onClick={ () => this.handleClick({ name }) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
