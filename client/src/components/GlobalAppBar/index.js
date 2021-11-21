import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


import logo from '../../assets/FeelingContent.png';

const styles = {
  logo: {
    height: '40px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}

const GlobalAppBar = () => {
  const darkBar = createTheme({
    palette: {
      secondary: {
        main: "#17141d",
        contrastText: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: [
        "Oswald",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });


  const useMatchMedia = (mediaQuery, initialValue) => {
    const [isMatching, setIsMatching] = useState(initialValue)
    useEffect(() => {
      const watcher = window.matchMedia(mediaQuery)
      setIsMatching(watcher.matches)
      const listener = (matches) => {
        setIsMatching(matches.matches)
      }
      if (watcher.addEventListener) {
        watcher.addEventListener('change', listener)
      } else {
        watcher.addListener(listener)
      }
      return () => {
        if (watcher.removeEventListener) {
          return watcher.removeEventListener('change', listener)
        } else {
          return watcher.removeListener(listener)
        }
      }
    }, [mediaQuery])

    return isMatching
  }

  const isDesktopResolution = useMatchMedia('(min-width:450px)', true)
  // if (Auth.loggedIn()) {
  return (
    <ThemeProvider theme={darkBar}>
      <AppBar position="static" color={"secondary"}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid>
              <Typography variant="h5">
                <Button
                  size="large"
                  component={Link}
                  color="inherit"
                  to="/"
                >
                  Feeling Content
                </Button>
              </Typography>
            </Grid>
            {isDesktopResolution && (
              <Grid>
                <img src={logo} alt='feeling content logo' style={styles.logo} />
              </Grid>
            )}
            <Grid>
              <Typography variant="h6">
                <Button
                  size="large"
                  component={Link}
                  color="inherit"
                  to="/episodes"
                >
                  Episodes
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
  // } else {
  //   return (
  //     <ThemeProvider theme={darkBar}>
  //       <AppBar position="static" color={"secondary"}>
  //         <Toolbar>
  //           <Grid
  //             container
  //             direction="row"
  //             justifyContent="space-between"
  //             alignItems="center"
  //           >
  //             <Grid>
  //               <Button size="large" component={Link} color="inherit" to="/">
  //                 PodCentral
  //               </Button>
  //             </Grid>
  //             <IconButton
  //               component={Link}
  //               to="/"
  //               size="large"
  //               edge="start"
  //               aria-label="menu"
  //               sx={{ mr: 2, color: "#f5b727" }}
  //             >
  //               <PodcastsIcon />
  //             </IconButton>
  //             <Grid item>
  //               <Box sx={{ display: { xs: "none", md: "flex" } }}>
  //                 <IconButton
  //                   size="large"
  //                   component={Link}
  //                   color="inherit"
  //                   to="/login"
  //                 >
  //                   <LoginIcon />
  //                 </IconButton>
  //               </Box>
  //             </Grid>
  //           </Grid>
  //         </Toolbar>
  //       </AppBar>
  //     </ThemeProvider>
  //   );
  // }
}
export default GlobalAppBar;
