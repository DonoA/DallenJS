import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dallen's Landing",
  description: "Me",
};

const styles: any = {
  body: {
    backgroundImage: 'url("/bg2.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  root: {
    // width: '100%',
    height: '100%',
    flexFlow: 'column',
    display: 'flex',

  },
  header: {
  },
  headerContainer: {
    diplay: 'flex',
    width: '70%',
    marginLeft: '15%',
  },
  headerItem: {
    padding: '1em',
    display: 'table-cell',
    verticalAlign: 'middle',
    fontFamily: "Liberation Sans",
    fontSize: '1.4em',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  headerBold: {
    fontWeight: 'bold',
    fontSize: '2em',
  },
  headerSpacer: {
    width: '5em',
  },
  headerLink: {
    color: 'inherit',
    textDecoration: 'none',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body style={styles.body}>
        <div style={styles.root}>
          <header style={styles.header}>
            <div style={styles.headerContainer}>
              <span style={{...styles.headerItem, ...styles.headerBold}}><a style={styles.headerLink} href="/">Dallen</a></span>
              <span style={{...styles.headerItem, ...styles.headerSpacer}}></span>
              <span style={styles.headerItem}><a style={styles.headerLink} href="/projects">Projects</a></span>
            </div>
          </header>
          { children }
        </div>
      </body>
    </html>
  );
}
