import React from 'react';
import { useSelector } from 'react-redux';
import { 
  createMuiTheme, ThemeProvider, makeStyles 
} from "@material-ui/core/styles";
import {
  TheContent, TheSidebar,
  TheFooter, TheHeader
} from './index';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Layout = () => {
  const classes = useStyles();
  const show = useSelector(state => state.sidebarShow);
  const theme = useSelector(state => state.theme);
  const Theme = createMuiTheme({
    palette: {
      type: theme ? "dark" : "light",
    }
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <div className={{ display: 'flex' }}>
          <TheSidebar />
          <div className={classNames({ [classes.appBar]: show, })}>
            <TheHeader />
            <div className={classes.root}>
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Layout;
