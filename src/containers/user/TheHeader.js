import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar, Toolbar, Typography, Button,
  IconButton, Hidden, Dialog, TextField,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      height: '5ch'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  white: {
    color: "white"
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    // padding: theme.spacing(1, 5, 1),
    justify: 'center'
  },
  textArea: {
    marginRight: '20px'
  },
}));

const Logout = (dispatch, history) => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.droot} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ButtonList = () => {
  const isLogin = useSelector(state => state.isLogin);
  const username = useSelector(state => state.username);
  const history = useHistory();
  const dispatch = useDispatch();
  // 登入的彈跳視窗
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const handlePrivacyOpen = () => setPrivacyOpen(true);
  const handlePrivacyClose = () => setPrivacyOpen(false);
  const classes = useStyles();
  const handleLogout = () => {
    Logout(dispatch, history);
  }
  // 控制密碼是否要顯示
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (isLogin) {
    return (
      <>
        <Hidden xsDown>
          <Typography>
            {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>登出</Button>
        </Hidden>
        <Hidden smUp>
          <Button color="inherit" onClick={handleLogout}>登出</Button>
        </Hidden>
      </>
    )
  } else {
    return (
      <>
        <Button type="submit" color="inherit" onClick={handlePrivacyOpen}>登入</Button>
        <Button color="inherit" href="#register"> 註冊 </Button>
        <Dialog onClose={handlePrivacyClose} aria-labelledby="privacy-title" open={privacyOpen}>
          <DialogTitle id="privacy-title" onClose={handlePrivacyClose} c2lassName={classes.title}>
            Welcome to NCNU_IM
            <IconButton
              aria-label="close"
              onClick={handlePrivacyClose}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <form className={classes.root} noValidate autoComplete="off">
                {/* username */}
                <div>
                  <TextField
                    id="outlined-username-input"
                    label="Username"
                    type="username"
                    autoComplete="current-username"
                    variant="outlined"
                    size="small"
                  />
                </div>
                {/* password */}
                <div>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </div>
              </form>
            </Typography>
          </DialogContent>
          <DialogActions align="center">
            <Button
              type="submit"
              variant="contained"
              // onClick={handlePrivacyClose}
              color="primary"
              className={classes.submit}
              fullWidth
            >
              登入
            </Button>
          </DialogActions>
          <Button
            // variant="contained"
            href="#login/forgetpassword"
            onClick={handlePrivacyClose}
            endAdornment
          >
            忘記密碼 ?
          </Button>
        </Dialog>
      </>
    )
  }
}

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const defaultShowOn = useSelector(state => state.sidebarShow);
  const darkTheme = useSelector(state => state.theme);
  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !defaultShowOn })
  }
  const changeTheme = () => {
    dispatch({ type: 'set', theme: !darkTheme })
  }
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Hidden xsDown>
            <IconButton
              edge="start" onClick={toggleSidebar}
              className={clsx(classes.menuButton, defaultShowOn && classes.hide)}
              color="inherit" aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <IconButton
              edge="start" onClick={toggleSidebar}
              className={clsx(classes.menuButton, !defaultShowOn && classes.hide)}
              color="inherit" aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden xsDown>
            <Typography variant="h6" className={classes.title}>
              國立暨南國際大學教學輔助系統
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6" className={classes.title}>
              NCNU
          </Typography>
          </Hidden>
          <ButtonList />
          <IconButton aria-label="change theme" onClick={changeTheme} color="inherit">
            {darkTheme ? <Brightness3Icon /> : <Brightness5Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
