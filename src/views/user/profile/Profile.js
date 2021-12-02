import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper,
  TextField, CssBaseline
} from '@material-ui/core/';
import {
  AccountCircle, AssignmentInd, Lock,
  Translate, Mail, Edit
} from '@material-ui/icons/';
import { editUserAccount } from '../../../api/user/api';
import ErrorMsg from '../pkg/ErrorMsg';
import UserProfile from '../../../assets/icons/profile.jpg';

const useStyles = makeStyles((theme) => ({
  editProfileText: {
    padding: theme.spacing(1, 'auto'),
  },
  profileText: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  profileImg: {
    textAlign: "center",
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
  },
  editIcon: {
    textAlign: 'right',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const isLogin = useSelector(state => state.isLogin);

  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={4} sm={5} md={5} className={classes.profileImg} direction="column" align="center" justify='center'>
        <Grid item className={classes.profileImg} justify='center' >
          <img src={UserProfile} alt='使用者頭像' align="center" />
        </Grid>
      </Grid>

      <Grid item xs={8} sm={7} md={7} >
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <AssignmentInd />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="StudentID">
            學號: 107213023
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="UserName">
            帳號: Frog
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Translate />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="RealName">
            真實姓名: Frog Chui
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <Mail />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="Email">
            電子信箱: s107213023@mail1.ncnu.edu.tw
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}


const EditProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
  const [StudentID, setStudentID] = useState("");
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [RealName, setRealName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
    let errorOccurred = false;
    if (StudentID === "") {
      errorMsg += "未填寫學號 ";
      errorList.push("StudentID");
      errorOccurred = true;
    }
    if (Email === "") {
      errorMsg += "未填寫電子信箱 ";
      errorList.push("Email");
      errorOccurred = true;
    }
    if (Email !== "") {
      if (!Email.includes("@") || !Email.includes(".com")) {
        errorMsg += "電子信箱格式錯誤 ";
        errorList.push("Email");
        errorOccurred = true;
      }
    }

    if (UserName === "") {
      errorMsg += "未填寫帳號 ";
      errorList.push("UserName");
      errorOccurred = true;
    }
    if (Password === "") {
      errorMsg += "未填寫密碼 ";
      errorList.push("Password");
      errorOccurred = true;
    }
    if (ConfirmPassword === "") {
      errorMsg += "未填寫確認密碼 ";
      errorList.push("ConfirmPassword");
      errorOccurred = true;
    }
    if (Password !== ConfirmPassword) {
      errorMsg += "密碼錯誤 ";
      errorOccurred = true;
    }

    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorOccurred)
      return;

    editUserAccount( StudentID, Email, UserName, RealName, Password)
      .then((rs) => {
        const data = rs.data;
        toast.info(data.message, options);
        history.push('/');

      })
      .catch((err) => {
        const data = err.response.data;
        toast.error(data.message, options);
      })
  }
  return (
    <Grid container spacing={5} justify='center'>
      <Grid container xs={4} sm={5} md={5} direction="column" align="center" justify='center'>
        <Grid item className={classes.profileImg} justify='center' >
          <img src={UserProfile} alt='使用者頭像' align="center" />
        </Grid>
        <Grid item className={classes.profileImg} justify='center' >
          <Button
            variant="outlined"
            color="info"
          >
            上傳頭貼
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={8} sm={7} md={7} >
        <ErrorMsg msg={errorMsg} />
        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <AssignmentInd />
          </Grid>
          <Grid item xs={4} sm={6} md={6} >
            <TextField
              fullWidth
              id="StudentID"
              error={errorComponent.includes("StudentID")}
              value={StudentID}
              onChange={(event) => setStudentID(event.target.value)}
              label="學號" />
          </Grid>
        </Grid>
        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="UserName"
              error={errorComponent.includes("UserName")}
              value='Frog'
              onChange={(event) => setUserName(event.target.value)}
              label="帳號"
              inputProps={
                { readOnly: true }} />
          </Grid>
        </Grid>
        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Translate />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="RealName"
              error={errorComponent.includes("RealName")}
              value={RealName}
              onChange={(event) => setRealName(event.target.value)}
              label="姓名" />
          </Grid>
        </Grid>
        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <Mail />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="Email"
              error={errorComponent.includes("Email")}
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              label="電子信箱" />
          </Grid>
        </Grid>

        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Lock />
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <TextField

              id="Password"
              error={errorComponent.includes("Password")}
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
              label="密碼"
              type="password" />
          </Grid>
        </Grid>
        <Grid container className={classes.editProfileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Lock />
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <TextField
              id="ConfirmPassword"
              error={errorComponent.includes("ConfirmPassword")}
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              label="確認"
              type="password" />
          </Grid>
        </Grid>


      </Grid>
      <Grid
        item xs={12} md={4} spacing={1}
      >
        <Button
          fullWidth
          onClick={submit}
          variant="contained"
          color="primary"
        >
          修改
        </Button>
      </Grid>
    </Grid>
  );
}
const ProfilePage = () => {
  const classes = useStyles();
  const [ProfileEdit, setProfileEdit] = React.useState(false);
  const handleProfileEditClick = () => {
    setProfileEdit(!ProfileEdit);
  };
  if (ProfileEdit) {
    return (
      <>
        <Paper className={classes.paper}>
          <CssBaseline />
          {ProfileEdit ? <EditProfile /> : <Profile />}
        </Paper>
      </>
    )
  } else {
    return (
      <>
        <Paper className={classes.paper}>
          <CssBaseline />
          <Grid className={classes.editIcon}>
            <Button onClick={handleProfileEditClick} timeout="auto" unmountOnExit>
              {ProfileEdit ? null : <Edit />}
            </Button>
          </Grid>
          {ProfileEdit ? <EditProfile /> : <Profile />}
        </Paper>
      </>
    )
  }

}
export default ProfilePage
