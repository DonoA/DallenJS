import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  contentContainer: {
    marginTop: theme.spacing(5),
    marginLeft: '5%',
    width: '90%',
    height: '90%',
  },
  padder: {
    marginLeft: theme.spacing(5),
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', password: ''
    };
  }

  generateOnChangeFor(name) {
    return ((event) => {
      const target = event.target;
      this.setState(() => ({
        [name]: target.value
      }));
    });
  }

  textInputFor(title, name) {
    return (
      <React.Fragment>
        <label>{title}:</label>
        <input
          type="text"
          value={this.state[name]}
          onChange={this.generateOnChangeFor(name)}></input>
      </React.Fragment>
    );
  }

  save() {
    fetch(`${this.props.endpoint}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    }).then(res => res.json())
      .then(res => {
        if(res.message === 'OK') {
          localStorage.cookie = res.cookie;
          window.location = `/`;
        } else {
          alert('Login Failed');
        }
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
            <center>
              {this.textInputFor('Username', 'username')}
              <span className={classes.padder}></span>
              {this.textInputFor('Password', 'password')}
              <button onClick={this.save.bind(this)}>Login</button>
            </center>
      </div>
    );
  }
}

export default withStyles(styles)(App);
