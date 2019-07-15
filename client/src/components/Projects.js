import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ProjectCard from './ProjectCard';

const styles = theme => ({
  contentContainer: {
    marginTop: theme.spacing(5),
    marginLeft: '5%',
    width: '90%',
    height: '90%',
  },
  table: {
    width: '100%',
  },
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <table className={classes.table}>
          <tr>
            <ProjectCard />
            <ProjectCard />
          </tr>
          <tr>
            <ProjectCard />
            <ProjectCard />
          </tr>
        </table>
      </div>
    );
  }
}

export default withStyles(styles)(App);
