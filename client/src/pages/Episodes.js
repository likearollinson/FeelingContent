import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import homeImage from '../assets/michaelbrad.JPG';

import { QUERY_SINGLE_EPISODE } from '../utils/queries'

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


const Episodes = () => {
  const { _id } = useParams();
  // console.log("param: ", _id)
  const { loading, data } = useQuery(QUERY_SINGLE_EPISODE, {
    variables: { _id: _id },
  });
  const episodeData = data?.episode || [];
  console.log("episodeData:", episodeData);
  const episodeArr = Object.values(episodeData);
  console.log(episodeArr)

  // const title = podcastArr[2];
  // const description = podcastArr[3];
  // const image = podcastArr[4];

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
          pt={10}
          sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          align="center"
        >
          Episodes
        </Typography>
      </Grow>
    </Box>
  );
}

export default Episodes;