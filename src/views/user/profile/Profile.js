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
import ErrorMsg from '../pkg/ErrorMsg';
import { getUserInfo, updateUserInfo } from '../../../api/user/profile/api';

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
    width: '20vw',
    height: '100%',
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

const Profile = (props) => {
  const classes = useStyles();
  const isLogin = useSelector(state => state.isLogin);
  const userProfile = props.userProfile;
  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} sm={12} md={5} direction="column" align="center" justify='center'>
        <Grid item justify='center' >
          <img className={classes.profileImg} src={userProfile.avatar} alt='使用者頭像' align="center" />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={7}>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <AssignmentInd />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="StudentID">
            學號: {userProfile.student_id}
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="UserName">
            帳號: {userProfile.username}
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Translate />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="RealName">
            真實姓名: {userProfile.realname}
          </Grid>
        </Grid>
        <Grid container className={classes.profileText} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <Mail />
          </Grid>
          <Grid item xs={4} sm={6} md={6} id="Email">
            電子信箱: {userProfile.email}
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}


const EditProfile = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const userProfile = props.userProfile;
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
  const [Avatar, setAvatar] = useState(userProfile.avatar);
  const [StudentID, setStudentID] = useState(userProfile.student_id);
  const [Email, setEmail] = useState(userProfile.email);
  const [RealName, setRealName] = useState(userProfile.realname);
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
      if (!Email.includes("@")) {
        errorMsg += "電子信箱格式錯誤 ";
        errorList.push("Email");
        errorOccurred = true;
      }
    }
    if (Password !== "" && ConfirmPassword === "") {
      errorMsg += "未填寫確認密碼 ";
      errorList.push("ConfirmPassword");
      errorOccurred = true;
      if (Password !== ConfirmPassword) {
        errorMsg += "密碼錯誤 ";
        errorOccurred = true;
      }
    }

    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorMsg !== "")
      return;
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token');
      updateUserInfo(token, StudentID, Email, RealName, Password, Avatar)
        .then(() => {
          // 跳出error視窗
          toast.info('修改成功', options);
          // 切換路徑
          history.push('/settings/profile');
          props.handleProfileEditClick()
        })
        .catch((err) => {
          toast.info(err.response.data.message, options);
        })
    }
  }
  return (
    <Grid container spacing={5} justify='center'>
      <Grid container xs={12} sm={12} md={5} direction="column" align="center" justify='center' spacing={2}>
        <Grid item justify='center' >
          <img className={classes.profileImg} src={userProfile.avatar} alt='上傳頭像連結' align="center" />
        </Grid>
        <Grid item justify='center' >
          <TextField
            fullWidth
            id="Avatar"
            defaultValue={userProfile.avatar}
            onChange={(event) => setAvatar(event.target.value)}
            label="頭貼連結" />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
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
              defaultValue={userProfile.student_id}
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
              defaultValue={userProfile.username}
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
              defaultValue={userProfile.realname}
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
              defaultValue={userProfile.email}
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
  const [userProfile, setUserProfile] = useState("");
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };
  if (localStorage.getItem('token') != null) {
    const token = localStorage.getItem('token');
    getUserInfo(token)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((err) => {
        toast.info(err.response.data.message, options);
      })
  }
  if (ProfileEdit) {
    return (
      <>
        <Paper className={classes.paper}>
          <CssBaseline />
          {ProfileEdit ? <EditProfile userProfile={userProfile} handleProfileEditClick={handleProfileEditClick} /> : <Profile userProfile={userProfile} />}
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
          {ProfileEdit ? <EditProfile userProfile={userProfile} /> : <Profile userProfile={userProfile} />}
        </Paper>
      </>
    )
  }

}
export default ProfilePage
