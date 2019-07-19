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
      projects: [{ title: '', files: [], description: '' }]
    };
  }

  componentDidMount() {
    fetch(`${this.props.endpoint}/${this.props.resource}`)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => res.json())
      .then(res => this.setState({ projects: res.archive }));
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

  generateFileChange(i) {
    return (event) => {
      const prjCpy = JSON.parse(JSON.stringify(this.state.projects));
      prjCpy[i].files = event.target.files;
      this.setState(() => ({
        projects: prjCpy
      }));
    };
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
      projects: [...prevState.projects, {title: '', files: [], description: ''}]
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

  fileListMap(files, func) {
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(func(files[i]));
    }
    return arr;
  }

  save() {
    console.log(this.state.projects);
    const allFiles = [];
    const entries = this.state.projects.map(prj =>({
      title: prj.title,
      downloads: this.fileListMap(prj.files, f => {
        allFiles.push(f);
        return f.name;
      }),
      description: prj.description
    }));

    console.log(entries);

    const upload = (i, finished) => {
      const fileForm = new FormData();
      fileForm.append('file', allFiles[i]);
      fetch(`${this.props.endpoint}/upload?auth=${localStorage.cookie}`, {
        method: 'POST',
        body: fileForm,
      }).then(() => {
        if(i < allFiles.length) {
          upload(i + 1, finished);
        } else {
          finished();
        }
      });
    }

    upload(0, () => {
      console.log('Upload complete');
      fetch(`${this.props.endpoint}/archive/edit?auth=${localStorage.cookie}`, {
        method: 'POST',
        body: JSON.stringify(entries)
      }).then(res => res.json())
        .then(() => window.location = `/${this.props.resource}`);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
          {this.state.projects.map((elt, i) => {
              return (<center key={i}>
                {this.textInputFor('Title', 'title', i)}
                <span className={classes.padder}></span>
                <label>Downloads:</label>
                <input
                  type="file"
                  multiple
                  onChange={this.generateFileChange(i)}></input>
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
