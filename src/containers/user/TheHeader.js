import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar, Toolbar, Typography, Button,
  IconButton, Hidden,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { toast } from 'react-toastify';
import Login from "../../views/pages/login/Login";
import { getUserInfo, refreshToken } from 'src/api/page/login/api'

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
    justify: 'center'
  },
  textArea: {
    marginRight: '20px'
  },
}));

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ButtonList = (props) => {
  const isLogin = useSelector(state => state.isLogin);
  // const isAdmin = useSelector(state => state.isAdmin);
  const username = useSelector(state => state.username);
  // const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'set', isLogin: false });
    dispatch({ type: 'set', isAdmin: false });
  }
  const handleLoginOpen = () => props.setLoginOpen(true);
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
        <Button color="inherit" onClick={handleLoginOpen}>登入</Button>
        <Button color="inherit" href="#register"> 註冊 </Button>
        <Login LoginOpen={props.LoginOpen} setLoginOpen={props.setLoginOpen} />
      </>
    )
  }
}

const refresh_token_in_time = () => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  }
  if (localStorage.getItem('token') != null) {
    refreshToken(localStorage.getItem('token'))
      .then((rs) => {
        localStorage.setItem('token', rs.data.token);
        console.log("refreshToken ", localStorage.getItem('token'));
      })
      .catch((error) => {
        toast.info(error.response, options);
      })
  }
}

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInterval(refresh_token_in_time, 2*60*60*1000);
  const [LoginOpen, setLoginOpen] = useState(false);
  const defaultShowOn = useSelector(state => state.sidebarShow);
  const darkTheme = useSelector(state => state.theme);
  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !defaultShowOn })
  }
  const changeTheme = () => {
    dispatch({ type: 'set', theme: !darkTheme })
  }
  useEffect(() => {
    let isSubscribed = true
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
    // 檢查是否有 token
    if (localStorage.getItem('token') != null) {
      // 查看 userData 裡有無東西
      const userToken = localStorage.getItem('token')
      getUserInfo(userToken)
        // 拿的到資料代表 token 尚未過期，進行 token refresh
        .then((rs) => {
          console.log("Current userID", rs.data.user_id);
          console.log("Current userName", rs.data.username);
          dispatch({ type: 'set', isLogin: true });
          refresh_token_in_time(userToken);
        })
        .catch((error) => {
          toast.info(error.response, options);
          console.log(error.response);
          // 登出
          localStorage.removeItem('token');
          dispatch({ type: 'set', isLogin: false });
          dispatch({ type: 'set', isAdmin: false });
        });
    } else {
      // 登出
      localStorage.removeItem('token');
      dispatch({ type: 'set', isLogin: false });
      dispatch({ type: 'set', isAdmin: false });
    }
    return () => isSubscribed = false
  }, [])
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
          <ButtonList setLoginOpen={setLoginOpen} LoginOpen={LoginOpen} />
          <IconButton aria-label="change theme" onClick={changeTheme} color="inherit">
            {darkTheme ? <Brightness3Icon /> : <Brightness5Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
