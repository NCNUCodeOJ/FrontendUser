import React from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  PersonRounded, Home, HelpOutline,
  School
} from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserShield
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    minWidth: 30,
  }
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const AdminLink = () => {
  const classes = useStyles();
  return (
    <ListItemLink href="/admin/">
      <ListItemIcon>
        <FontAwesomeIcon className={classes.icon} icon={faUserShield} />
      </ListItemIcon>
      <ListItemText primary="管理員介面" />
    </ListItemLink>
  )
}

const LoginItem = () => {
  const isLogin = useSelector(state => state.isLogin);
  const isAdmin = useSelector(state => state.isAdmin);
  const CustomNavBar = useSelector(state => state.customNavBar);
  if (!isLogin) {
    return null;
  }
  if (CustomNavBar !== null)
    return <CustomNavBar />
  return (
    <>
      {isAdmin && <AdminLink />}

      <ListItemLink href="#course" >
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary="課程" />
      </ListItemLink>
      <ListItemLink href="#settings/profile">
        <ListItemIcon>
          <PersonRounded />
        </ListItemIcon>
        <ListItemText primary="個人資訊" />
      </ListItemLink>
      <ListItemLink href="#settings/systeminformation">
        <ListItemIcon>
          <HelpOutline />
        </ListItemIcon>
        <ListItemText primary="系統資訊" />
      </ListItemLink>
    </>
  )
}

const NavList = () => {
  return (
    <>
      <List>
        <ListItemLink href="#dashboard">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="首頁" />
        </ListItemLink>
        <LoginItem />
      </List>
    </>
  );
}

export default NavList;
