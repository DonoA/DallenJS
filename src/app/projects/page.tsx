import React from 'react';
import ItemCard, { ItemCardProps } from './ItemCard';
import { projects } from '../../websiteConfig';

export default function Projects() {
  const styles = {
    contentContainer: {
      marginLeft: '5%',
      width: '90%',
      height: '90%',
    },
    row: {
      display: 'flex'
    }
  }

  let first = true;
  const items = projects.reduce((lst: ItemCardProps[][], elt, i) => {
    if(first) {
      lst.push([elt]);
    } else {
      lst[lst.length - 1].push(elt);
    }

    first = !first;
    return lst;
  }, []);


  return (
    <div style={styles.contentContainer}>
      {items.map((row, i) => {
        return (
          <div key={i} style={styles.row}>
            { row.map((elt, j) => (<ItemCard key={j} title={elt.title} link={elt.link} description={elt.description} />))}
          </div>
        );
      })}
    </div>
  );
}
