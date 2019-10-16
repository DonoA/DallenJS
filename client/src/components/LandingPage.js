import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PieChart from 'react-minimal-pie-chart';

const styles = theme => ({
  contentContainer: {
    width: '100%',
    height: '90%',
    display: 'table',
    textAlign: 'center',
    marginTop: theme.spacing(10),
  },
});

class App extends React.Component {

  COLORS = {
    Java: '#b07219',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Ruby: '#f98889',
    Scala: '#c22d40',
    C: '#555555',
  };

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

  componentDidUpdate() {
    let pieText = document.getElementById("piechart").getElementsByTagName("text");
    for(let i = 0; i < pieText.length; i++) {
      pieText[i].setAttribute("x", 51);
      pieText[i].setAttribute("y", 51);
    }
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
          return {
            title: Math.floor(sts.langStats[lang]).toLocaleString(),
            langName: lang,
            value: sts.langStats[lang],
            color: this.COLORS[lang] }
        }).slice(0, 6); // Only select top 6 languages (graph gets too busy otherwise)

      statFrag = (
        <React.Fragment>
          <div style={{fontSize: '72px', marginBottom: '-20px'}}>{sts.additions.toLocaleString()}</div>
          <div>lines of code commited to git</div>
          <div style={{fontSize: '24px', marginTop: '24px'}}>{sts.commits.toLocaleString()} commits in {sts.repos} repositories</div>
          <br />
          <div style={{color: 'black', fontSize: '20px', marginBottom: '0px', marginTop: '35px'}}>
            Top 6 languages, hover for line count
          </div>
          <span id="piechart">
            <PieChart
              style={{width: '30%', height: '30%'}}
              data={langData}
              label={({ data, dataIndex }) => {
                if(dataIndex < 6) {
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
              labelPosition={80}
            />
          </span>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.contentContainer}>
          <center>
            {statFrag}
          </center>
      </div>
    );
  }
}

export default withStyles(styles)(App);
