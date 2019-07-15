import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  githubLink: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
  },
  row: {
    width: '40%',
    paddingRight: '3%',
    paddingLeft: '3%',
    paddingBottom: theme.spacing(3),
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    paddingRight: '2%',
    paddingLeft: '2%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  image: {
    filter: 'invert(1)',
  },
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
        <td className={classes.row}>
          <div className={classes.card}>
            <h2>Skiff <a className={classes.githubLink} href='https://github.com/DonoA/Skiff'><img className={classes.image} src="/github-circle.svg" /></a></h2>
            <span>A compiler for the skiff programming language. Inherits strongly from Scala and compiles into portable C code. More words that might be added to the end to see the padding on the text</span>
          </div>
        </td>
    );
  }
}

export default withStyles(styles)(App);
