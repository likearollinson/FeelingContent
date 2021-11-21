import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import homeImage from '../assets/michaelbrad.JPG';

const styles = {
  homeImage: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  lowerImage: {
    display: 'block',
    width: '150px',
  },
};


export default function Home() {

  return (
    <Box flexGrow={1}>
      <Grow
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 2000 }}
        in={true}
      >
        <Typography
          fontFamily="Oswald"
          variant="p"
          component="h1"
          pt={2}
          sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          align="center"
        >
          Welcome to Feeling Content
        </Typography>
      </Grow>
      <Grow
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 2000 }}
        in={true}
      >
        <Typography
          fontFamily="Oswald"
          variant="p"
          component="h5"
          pt={2}
          sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          align="center"
        >
          Where Brad and Michael discuss the content currently making them feel content
        </Typography>
      </Grow>
      <Grow
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 2000 }}
        in={true}
      >
        <Box flexGrow={1} pt={1}>
          <img src={homeImage} alt="brad and michael" style={styles.homeImage} />
        </Box>
      </Grow>
    </Box>
  );
}
