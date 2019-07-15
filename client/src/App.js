import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Projects from './components/Projects';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';

class App extends React.Component {

  render() {
    return (
      <Router>
        <CssBaseline />
        <Switch>
          <Route path='/projects'
              render={ () => <Layout><Projects endpoint={ this.API_ENDPOINT } /></Layout>} />

          <Route path='/tools'
              render={ () => <Layout><span>wow</span></Layout>} />

          <Route path='/archive'
              render={ () => <Layout><span>wow</span></Layout>} />

          <Route path='/'
              render={ () => <Layout><LandingPage endpoint={ this.API_ENDPOINT } /></Layout>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
