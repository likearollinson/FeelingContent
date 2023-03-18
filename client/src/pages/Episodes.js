import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import { useQuery } from "@apollo/client";

import homeImage from '../assets/michaelbrad.JPG';

import { QUERY_ALL_EPISODES } from '../utils/queries'

const Episodes = () => {
  // const { _id } = useParams();
  // console.log("param: ", _id)
  const { loading, error, data } = useQuery(QUERY_ALL_EPISODES);

  if (loading) {
    return (
      <Box flexGrow={1} sx={{ bgcolor: '#f0eeeb', height: '100vh' }} >
        <Typography
          variant="h2"
          component="div"
          align="center"
          pt={20}
          sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
        >
          LOADING...
        </Typography>
      </Box>
    )
  };
  if (error) {
    return (
      <Box flexGrow={1} sx={{ bgcolor: '#f0eeeb', height: '100vh' }} >
        <Typography
          variant="h2"
          component="div"
          align="center"
          pt={20}
          sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}

        >
          ERROR
        </Typography>
      </Box>
    )
  }

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
      {data?.episodes?.length > 0 ?
        <div>
          {data.episodes.map((episode) => (
            <div key={episode._id}>
              <h2>{episode.title}</h2>
              <p>{episode.description}</p>
              {/* Render other fields as needed */}
            </div>
          ))}
        </div>
        :
        <Typography
          variant="p"
          component="div"
          align="center"
          sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
        >
          No episodes found.
        </Typography>
      }
    </Box>
  );
}

export default Episodes;