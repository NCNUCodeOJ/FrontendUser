import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  SwipeableDrawer, Drawer, Divider,
  ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser
} from '@fortawesome/free-solid-svg-icons';


import Nav from './NavList';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
}));

const TheSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const defaultShowOn = useSelector(state => state.sidebarShow);
  const username = useSelector(state => state.username);
  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !defaultShowOn })
  }
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <Hidden xsDown>
        <Drawer
          variant="persistent"
          className={classes.drawer}
          anchor="left"
          open={defaultShowOn ? true : false}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleSidebar}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Nav />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          disableBackdropTransition={!iOS} disableDiscovery={iOS}
          className={classes.drawer}
          anchor="left"
          open={defaultShowOn ? false : true}
          classes={{
            paper: classes.drawerPaper,
          }}
          onOpen={toggleSidebar}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleSidebar}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUser} />
            </ListItemIcon>
            <ListItemText primary={username} />
          </ListItem>
          <Divider />
          <Nav />
        </SwipeableDrawer>
      </Hidden>
    </>
  )
}

export default React.memo(TheSidebar)
