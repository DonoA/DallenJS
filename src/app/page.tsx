"use client"

import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { stats } from "../websiteConfig";

export default function Home() {

  const COLORS: any = {
    Java: '#b07219',
    JavaScript: '#f1e05a',
    TypeScript: '#3f73b5',
    Python: '#1553a3',
    Scala: '#c22d40',
    C: '#555555',
  };

  const styles: any = {
    footerColor: {color: 'lightgray'},
    footer: {position: 'fixed', bottom: '0.5%', width: '100%'},
    commitText: {fontSize: '24px', marginTop: '24px'},
    additionsText: {fontSize: '72px', marginBottom: '-20px'},
    piechart: {marginLeft: '5.5%', height: '60%'},
  }

  const langData = Object.entries(stats.langStats)
        .sort((a, b) => a[1] - b[1])
        .map((lang, i) => {
          return {
            value: lang[1],
            label: lang[0],
            color: COLORS[lang[0]],
          }
        }).slice(-6);

  const updatedDate = new Date(0);
  updatedDate.setUTCSeconds(stats.updateTime);

  return (
    <center style={{height: '100%'}}>
      <div style={styles.additionsText}>{stats.additions.toLocaleString()}</div>
      <div>lines of code commited to git</div>
      <div style={styles.commitText}>{stats.commits.toLocaleString()} commits in {stats.repos} repositories</div>
      <br />
      <div id="piechart" style={styles.piechart}>
        <PieChart
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              arcLabel: (item) => `${item.label}`,
              arcLabelMinAngle: 20,
              data: langData,
            },
          ]}
        />
      </div>
      <footer style={{...styles.footer, ...styles.footerColor}}>
        Commit information from <a href="https://github.com/DonoA/GithubStatTool" style={styles.footerColor}>GithubStatTool</a>, collected {updatedDate.toLocaleDateString()}
      </footer>
    </center>
  );
}
