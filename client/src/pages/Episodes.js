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
          Episodes
        </Typography>
      </Grow>
    </Box>
  );
}
