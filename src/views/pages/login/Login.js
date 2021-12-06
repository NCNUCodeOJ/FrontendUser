import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { userLogin } from '../../../api/page/login/api';
import {
  Typography, Button,
  IconButton, Dialog, TextField,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';

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

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const handleLoginClose = () => props.setLoginOpen(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const login_func = () => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
    userLogin(values.username, values.password)
      .then((rs) => {
        toast.info('登入成功', options)
        history.push('/')
        localStorage.setItem('token', rs.data.token)
        dispatch({ type: 'set', isLogin: true })
      })
      .catch((error) => {
        toast.error(error.response.data.message, options)
        console.log(error.response.data.message)
      })
    handleLoginClose();
  };

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    let isSubscribed = true
    return () => isSubscribed = false
  }, [])
  if (isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>
      <Dialog onClose={handleLoginClose} aria-labelledby="privacy-title" open={props.LoginOpen}>
        <DialogTitle id="privacy-title" onClose={handleLoginClose} c2lassName={classes.title}>
          Welcome to NCNU_IM
          <IconButton
            aria-label="close"
            onClick={handleLoginClose}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-username-input"
                  label="Username"
                  type="input"
                  autoComplete="current-username"
                  variant="outlined"
                  size="small"
                  value={values.username}
                  onChange={handleChange('username')}
                />
              </div>
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
            onClick={login_func}
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
          onClick={handleLoginClose}
          endAdornment
        >
          忘記密碼 ?
        </Button>
      </Dialog>
    </>
  );
}

export default Login;
