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
            <h2>{this.props.title} <a className={classes.githubLink} href={this.props.link}><img className={classes.image} src="/github-circle.svg" /></a></h2>
            <span>{this.props.description}</span>
          </div>
        </td>
    );
  }
}

export default withStyles(styles)(App);
