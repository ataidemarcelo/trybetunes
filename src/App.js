import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />

        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />

        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />

        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
