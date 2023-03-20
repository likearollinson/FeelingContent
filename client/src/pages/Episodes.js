import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link'
import { Spotify } from 'react-spotify-embed';
import { useQuery } from "@apollo/client";

// import homeImage from '../assets/michaelbrad.JPG';

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
          fontWeight="bold"
          variant="p"
          component="h1"
          pt={10}
          sx={{ flexGrow: 1, display: { xs: "block", sm: "block" }, mb: 5 }}
          align="center"
        >
          E P I S O D E S
        </Typography>
      </Grow>
      {data?.episodes?.length > 0 ?
        <Box>
          {Object.values(data.episodes).reverse().map((episode) => (
            <Box key={episode._id}>
              <Grow
                style={{ transformOrigin: "0 0 0" }}
                {...{ timeout: 2000 }}
                in={true}
              >
                <Typography
                  fontFamily="Oswald"
                  variant="p"
                  component="h3"
                  align="center"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, mb: 1 }}
                >
                  {episode.title}
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
                  component="h3"
                  align="center"
                  sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' }, mb: 1 }}
                >
                  <Link href={episode.widget} target="_blank" sx={{ color: 'black' }}>
                    {episode.title}
                  </Link>
                </Typography>
              </Grow>
              <Box sx={{ m: 2, display: { xs: 'none', sm: 'block' } }}>
                <Spotify wide link={episode.widget} />
              </Box>
              <Grow
                style={{ transformOrigin: "0 0 0" }}
                {...{ timeout: 2000 }}
                in={true}
              >
                <Typography
                  fontFamily="Oswald"
                  variant="p"
                  component="p"
                  align="center"
                  sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, mb: 1, ml: 2, mr: 2 }}
                >
                  {episode.description}
                </Typography>
              </Grow>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} flexDirection="column" justifyContent="center" align="center">
                  <Grow
                    style={{ transformOrigin: "0 0 0" }}
                    {...{ timeout: 2000 }}
                    in={true}
                  >
                    <Typography
                      fontFamily="Oswald"
                      variant="p"
                      component="h6"
                      align="center"
                      sx={{ fontWeight: 'bold', flexGrow: 1, display: { xs: 'block', sm: 'block' }, mb: 1 }}
                    >
                      Brad's What Ya Feelin
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
                      component="h7"
                      align="center"
                      sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, mb: 1 }}
                    >
                      {episode.bradWYF}
                    </Typography>
                  </Grow>
                  <Grow
                    style={{ transformOrigin: "0 0 0" }}
                    {...{ timeout: 2000 }}
                    in={true}
                  >
                    <img src={episode.bradArt} alt="Brad's what ya feelin' album art" width="185" />
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} flexDirection="column" justifyContent="center" align="center">
                  <Grow
                    style={{ transformOrigin: "0 0 0" }}
                    {...{ timeout: 2000 }}
                    in={true}
                  >
                    <Typography
                      fontFamily="Oswald"
                      variant="p"
                      component="h6"
                      sx={{ fontWeight: 'bold', flexGrow: 1, display: { xs: 'block', sm: 'block' }, mb: 1 }}
                    >
                      Michael's What Ya Feelin
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
                      component="h7"
                      align="center"
                      sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, mb: 1 }}
                    >
                      {episode.michaelWYF}
                    </Typography>
                  </Grow>
                  <Grow
                    style={{ transformOrigin: "0 0 0" }}
                    {...{ timeout: 2000 }}
                    in={true}
                  >
                    <img src={episode.michaelArt} alt="Michael's what ya feelin' album art" width="185" />

                  </Grow>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        :
        <Typography
          fontFamily="Oswald"
          variant="p"
          component="div"
          align="center"
          sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
        >
          No episodes found.
        </Typography>
      }
    </Box >
  );
}

export default Episodes;