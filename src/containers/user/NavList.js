import React from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, Collapse,
  ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  ExpandLess, ExpandMore, PersonRounded,
  LaptopMac, EmojiEvents, Code,
  Settings, Home
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
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const AdminLink = () => {
  return (
    <ListItemLink href="/admin/">
      <ListItemIcon>
        <FontAwesomeIcon icon={faUserShield} />
      </ListItemIcon>
      <ListItemText primary="管理員介面" />
    </ListItemLink>
  )
}

const LoginItem = () => {
  const classes = useStyles();
  const isLogin = useSelector(state => state.isLogin);
  const isAdmin = useSelector(state => state.isAdmin);
  const CustomNavBar = useSelector(state => state.customNavBar);
  const [InfoClassOpen, setInfoClassOpen] = React.useState(false);
  const handleInfoClassClick = () => setInfoClassOpen(!InfoClassOpen);
  if (!isLogin) {
    return null;
  }
  if (CustomNavBar !== null)
    return <CustomNavBar />
  return (
    <>
      {isAdmin && <AdminLink />}
      <ListItem button onClick={handleInfoClassClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="相關資訊設定" />
        {InfoClassOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={InfoClassOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink className={classes.nested} href="#settings/profile">
            <ListItemIcon>
              <PersonRounded />
            </ListItemIcon>
            <ListItemText primary="個人資訊" />
          </ListItemLink>
          <ListItemLink className={classes.nested} href="#settings/systeminformation">
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText primary="系統資訊" />
          </ListItemLink>
        </List>
      </Collapse>
      <ListItemLink href="#course" >
        <ListItemIcon>
          <LaptopMac />
        </ListItemIcon>
        <ListItemText primary="課程" />
      </ListItemLink>
      <ListItemLink href="#contest/contestlist" >
        <ListItemIcon>
          <EmojiEvents />
        </ListItemIcon>
        <ListItemText primary="比賽" />
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
