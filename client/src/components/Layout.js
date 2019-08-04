import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    flexFlow: 'column',
    display: 'flex',
  },
  header: {
    height: '10%',
  },
  headerContainer: {
    diplay: 'flex',
    width: '70%',
    marginLeft: '15%',
  },
  headerItem: {
    padding: theme.spacing(3),
    display: 'table-cell',
    verticalAlign: 'middle',
    fontFamily: "Liberation Sans",
    fontSize: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.6)',
  },
  headerBold: {
    fontWeight: 'bold',
    fontSize: theme.spacing(3),
  },
  headerSpacer: {
    width: theme.spacing(20),
  },
  headerLink: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

class App extends React.Component {

  render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <header className={classes.header}>
            <div className={classes.headerContainer}>
              <span className={`${classes.headerItem} ${classes.headerBold}`}><a className={classes.headerLink} href="/">Dallen</a></span>
              <span className={`${classes.headerItem} ${classes.headerSpacer}`}></span>
              <span className={classes.headerItem}><a className={classes.headerLink} href="/projects">Projects</a></span>
              {/* <span className={classes.headerItem}><a className={classes.headerLink} href="/archive">Archive</a></span> */}
            </div>
          </header>
          { children }
        </div>
      </React.Fragment>

    );
  }
}

export default withStyles(styles)(App);
