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
      projects: [{ title: '', link: '', description: '' }]
    };
  }

  componentDidMount() {
    fetch(`${this.props.endpoint}/${this.props.resource}`)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => res.json())
      .then(res => this.setState({ projects: res.projects }));
  }

  generateOnChangeFor(name, i) {
    return ((event) => {
      const prjCpy = JSON.parse(JSON.stringify(this.state.projects));
      prjCpy[i][name] = event.target.value;
      this.setState(() => ({
        projects: prjCpy
      }));
    });
  }

  textInputFor(title, name, i) {
    return (
      <React.Fragment>
        <label>{title}:</label>
        <input
          type="text"
          value={this.state.projects[i][name]}
          onChange={this.generateOnChangeFor(name, i)}></input>
      </React.Fragment>
    );
  }

  addElt() {
    this.setState(prevState => ({
      projects: [...prevState.projects, {title: '', link: '', description: ''}]
    }));
  }

  generateRemoveElt(i) {
    return (() => {
      const prjCpy = JSON.parse(JSON.stringify(this.state.projects));
      prjCpy.splice(i, 1);
      this.setState(() => ({
        projects: prjCpy
      }));
    });
  }

  save() {
    fetch(`${this.props.endpoint}/${this.props.resource}/edit?auth=${localStorage.cookie}`, {
      method: 'POST',
      body: JSON.stringify(this.state.projects),
    })
      .then(res => res.json())
      .then(() => window.location = `/${this.props.resource}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
          {this.state.projects.map((elt, i) => {
              return (<center key={i}>
                {this.textInputFor('Title', 'title', i)}
                <span className={classes.padder}></span>
                {this.textInputFor('Link', 'link', i)}
                <br />
                <br />
                <label>Description:</label>
                <br />
                <textarea
                  rows={5}
                  cols={100}
                  value={this.state.projects[i].description}
                  onChange={this.generateOnChangeFor('description', i)}></textarea>
                <br />
                <button onClick={this.generateRemoveElt(i)}>Remove Project</button>
                <hr />
              </center>);
          })}
          <button onClick={this.addElt.bind(this)}>Add Project</button>
          <button onClick={this.save.bind(this)}>Save</button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
