import React from 'react';

export interface ItemCardProps {
  title: string;
  description: string;
  link: string;
}

export default function ItemCard(props: ItemCardProps) {
  const styles = {
    title: {
      marginTop: '0.1em',
      marginBottom: '0.1em',
    },
    githubLink: {
      verticalAlign: 'middle',
      paddingTop: '0.3em',
      marginLeft: '0.5em',
      cursor: 'pointer',
    },
    card: {
      color: 'white',
      paddingRight: '2%',
      paddingLeft: '2%',
      paddingTop: '1em',
      paddingBottom: '1em',
      borderRadius: '1em',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      width: '50%',
      display: 'inline-block',
      margin: '1%'
    },
    image: {
      filter: 'invert(1)',
    },
  };



  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{props.title}
        <a style={styles.githubLink} href={props.link}>
        <img style={styles.image} src={'/github-circle.svg'} /></a>
      </h2>
      <span>{props.description}</span>
    </div>
  );
}
