import * as React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';

import logo from '../../assets/FeelingContent.png';

const styles = {
  logo: {
    height: '30px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}

const ElevationScroll = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const GlobalAppBar = (props) => {
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
  const isMobileResolution = useMatchMedia('(max-width:449px)', true)
  // if (Auth.loggedIn()) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <ThemeProvider theme={darkBar}>
          <AppBar
            color={"secondary"}
          >
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid>
                  <Button
                    size="medium"
                    component={Link}
                    color="inherit"
                    to="/"
                  >
                    Feeling Content
                  </Button>
                </Grid>
                {isDesktopResolution && (
                  <Grid>
                    <img src={logo} alt='feeling content logo' style={styles.logo} />
                  </Grid>
                )}
                {isDesktopResolution && (
                  <Grid>
                    <Button
                      size="small"
                      component={Link}
                      color="inherit"
                      to="/episodes"
                    >
                      Episodes
                    </Button>
                    <Button
                      size="small"
                      component={Link}
                      color="inherit"
                      to="/whatyafeelin"
                    >
                      What Ya Feelin'?
                    </Button>
                  </Grid>
                )}
                {isMobileResolution && (
                  <Grid>
                    <IconButton
                      size="large"
                      edge="start"
                      color="error"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </ElevationScroll>
    </React.Fragment>
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
