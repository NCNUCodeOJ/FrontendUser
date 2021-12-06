import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Paper, Grid, Typography, TextField
} from '@material-ui/core';
import {
  Mail, Lock, TextFields,
  Person, InsertPhoto, FeaturedPlayList,
} from '@material-ui/icons';
import ErrorMsg from '../pkg/ErrorMsg';
import { register } from '../../../api/user/register/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    textAlign: 'center',
  },
  grid: {
    padding: 0
  }
}));

const InputComponent = (props) => {
  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <props.icon />
      </Grid>
      <Grid item xs={true}>
        <TextField
          fullWidth
          size='medium'
          id={props.id}
          error={props.error.includes(props.id)}
          value={props.value}
          onChange={(event) => props.set(event.target.value)}
          label={props.label}
          type={props.type}
        />
      </Grid>
    </Grid >
  )
}

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
  const [StudentID, setStudentID] = useState("");
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [RealName, setRealName] = useState("");
  const [Password, setPassword] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const isLogin = useSelector(state => state.isLogin);

  if (isLogin) {
    return (
      <Redirect to="#dashboard" />
    )
  }
  const submit = () => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    };
    const errorList = [];
    let errorMsg = "";

    if (StudentID === "") {
      errorMsg += "未填寫學號 ";
      errorList.push("StudentID");
    }
    if (UserName === "") {
      errorMsg += "未填寫帳號 ";
      errorList.push("UserName");
    }
    if (RealName === "") {
      errorMsg += "未填寫真實姓名 ";
      errorList.push("RealName");
    }
    if (Email === "") {
      errorMsg += "未填寫電子信箱 ";
      errorList.push("Email");
    }
    if (Email !== "") {
      if (!Email.includes("@")) {
        errorMsg += "電子信箱格式錯誤 ";
        errorList.push("Email");
      }
    }
    if (Password === "") {
      errorMsg += "未填寫密碼 ";
      errorList.push("Password");
    }
    if (ConfirmPassword === "") {
      errorMsg += "未填寫確認密碼 ";
      errorList.push("ConfirmPassword");
    }
    if (Password !== ConfirmPassword) {
      errorMsg += "密碼錯誤 ";
    }

    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorMsg !== "")
      return;
    register(StudentID, Email, UserName, RealName, Password, Avatar)
      .then(() => {
        // 跳出error視窗
        toast.info('註冊成功', options);
        // 切換路徑
        history.push('/');
      })
      .catch((err) => {
        toast.info(err.response.data.message, options);
      })
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography component="h4" variant="h4" align="center">
          註冊
        </Typography>
        <ErrorMsg msg={errorMsg} />
        <div className={classes.box}>
          <Grid container justifyContent='center' spacing={5}>
            <Grid item xs={12} md={4} >
              <InputComponent
                id="StudentID"
                value={StudentID}
                icon={FeaturedPlayList}
                label="學號"
                set={setStudentID}
                error={errorComponent}
              />
            </Grid>
            <Grid
              item xs={12} md={4} >
              <InputComponent
                id="UserName"
                icon={Person}
                value={UserName}
                label="帳號"
                set={setUserName}
                error={errorComponent}
              />
            </Grid>
            <Grid
              item xs={12} md={4}>
              <InputComponent
                id="RealName"
                icon={TextFields}
                value={RealName}
                label="真實姓名"
                set={setRealName}
                error={errorComponent}
              />
            </Grid>
            <Grid
              item xs={12} md={6}>
              <InputComponent
                id="Avatar"
                icon={InsertPhoto}
                value={Avatar}
                label="頭像網址"
                set={setAvatar}
                error={errorComponent}
              />
            </Grid>
            <Grid
              item xs={12} md={6} >
              <InputComponent
                id="Email"
                icon={Mail}
                value={Email}
                label="電子信箱"
                set={setEmail}
                error={errorComponent}
              />
            </Grid>
            <Grid
              item xs={12} md={6} >
              <InputComponent
                id="Password"
                icon={Lock}
                value={Password}
                label="密碼(長度需至少為6)"
                set={setPassword}
                error={errorComponent}
                type="password"
              />
            </Grid>
            <Grid
              item xs={12} md={6} >
              <InputComponent
                id="ConfirmPassword"
                icon={Lock}
                value={ConfirmPassword}
                label="確認"
                set={setConfirmPassword}
                error={errorComponent}
                type="password"
              />
            </Grid>
            <Grid
              item xs={12} md={4} justifyContent='center'
              container alignItems="flex-end" spacing={1}
            >
              <Button
                fullWidth
                onClick={submit}
                variant="contained"
                color="primary"
              >
                註冊
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  )
}

export default Register;
