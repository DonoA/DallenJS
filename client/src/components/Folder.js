import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ItemCard from './ItemCard';

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

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch(`${this.props.endpoint}/${this.props.resource}`)
      .then(res => res.json())
      .then(res => this.setState({ items: res[this.props.resource] }));
  }

  render() {
    const { classes } = this.props;

    let first = true;
    const items = this.state.items.reduce((lst, elt, i) => {
      if(first) {
        lst.push([elt]);
      } else {
        lst[lst.length - 1].push(elt);
      }

      first = !first;
      return lst;
    }, []);

    return (
      <div className={classes.contentContainer}>
        <table className={classes.table}>
          <tbody>
            {items.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((elt, j) => (<ItemCard key={j} title={elt.title} link={elt.link} description={elt.description}/>))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(styles)(App);
