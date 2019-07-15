import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  contentContainer: {
    width: '100%',
    height: '90%',
    display: 'table',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.statsContainer}>
          {/* <div>123456</div>
          <div>lines of code contributed on GitHub</div>
          <div>across 27 repositories in 132 commits</div>
          <div>across for 5 different organziations</div>
          <div>Impressive pie chart of language stats goes here</div> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
