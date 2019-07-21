import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PieChart from 'react-minimal-pie-chart';

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

  COLORS = [
    '#b07219',
    '#f1e05a',
    '#3572A5',
    '#f98889',
    '#c22d40',
    '#555555',
  ]

  constructor(props) {
    super(props);
    this.state = {
      stats: null
    };
  }

  componentDidMount() {
    fetch(`${this.props.endpoint}/github`)
      .then(res => res.json())
      .then(res => this.setState({ stats: res.stats }));
  }

  render() {
    const { classes } = this.props;

    let statFrag = (<React.Fragment></React.Fragment>);

    if(this.state.stats !== null) {
      const sts = this.state.stats;
      console.log(sts);

      const langData = Object.keys(sts.langStats)
        .sort((a, b) => sts.langStats[b] - sts.langStats[a])
        .map((lang, i) => {
          return { title: Math.floor(sts.langStats[lang]), langName: lang, value: sts.langStats[lang], color: this.COLORS[i] }
        }).slice(0, 6);

      statFrag = (
        <React.Fragment>
          <div>{sts.additions}</div>
          <div>lines of code contributed on GitHub</div>
          <div>across {sts.repos} repositories in {sts.commits} commits</div>
          <br />
          <span>
            <PieChart
              style={{width: '30%', height: '30%'}}
              data={langData}
              label={({ data, dataIndex }) => {
                if(dataIndex < 2) {
                  return data[dataIndex].langName + ' ' + Math.floor(data[dataIndex].value/1000) +'k';
                } else {
                  return data[dataIndex].langName;
                }
              }}
              labelStyle={{
                fontSize: '2px',
                fontFamily: 'sans-serif',
                fill: '#121212'
              }}
              radius={35}
              labelPosition={85}
            />
          </span>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.contentContainer}>
        <div className={classes.statsContainer}>
          <center>
            {statFrag}
          </center>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
