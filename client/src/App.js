import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Folder from './components/Folder';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import Form from './components/Form';
import ArchiveForm from './components/ArchiveForm';
import Login from './components/Login';

class App extends React.Component {
  API_ENDPOINT = 'http://localhost:3030'

  render() {
    return (
      <Router>
        <CssBaseline />
        <Switch>
          <Route path='/projects/edit'
              render={ () => <Layout><Form resource={'projects'} endpoint={ this.API_ENDPOINT }/></Layout>} />

          <Route path='/projects'
              render={ () => <Layout><Folder resource={'projects'} endpoint={ this.API_ENDPOINT } linkIcon='/github-circle.svg'/></Layout>} />

          <Route path='/tools/edit'
              render={ () => <Layout><Form resource={'tools'} endpoint={ this.API_ENDPOINT } /></Layout>} />

          <Route path='/tools'
              render={ () => <Layout><Folder resource={'tools'} endpoint={ this.API_ENDPOINT } linkIcon='/link-variant.svg'/></Layout>} />

          <Route path='/archive/edit'
              render={ () => <Layout><ArchiveForm resource={'archive'} endpoint={ this.API_ENDPOINT } /></Layout>} />

          <Route path='/archive'
              render={ () => <Layout><Folder resource={'archive'} endpoint={ this.API_ENDPOINT } linkIcon='/link-variant.svg'/></Layout>} />

          <Route path='/login'
              render={ () => <Layout><Login endpoint={ this.API_ENDPOINT } /></Layout>} />

          <Route path='/'
              render={ () => <Layout><LandingPage endpoint={ this.API_ENDPOINT } /></Layout>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
