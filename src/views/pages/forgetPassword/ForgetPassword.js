import React, { useState } from 'react'
import {
  Paper, Typography, Grid, TextField, Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import { Alert, AlertTitle } from '@material-ui/lab';
import HCaptcha from '@hcaptcha/react-hcaptcha';

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
  box: {
    textAlign: 'center',
  }
}));
const handleVerificationSuccess = (token, ekey) => {
  console.log(token);
}
const ForgetPassword = () => {
  const classes = useStyles();
  const [mail, setMail] = useState("");
  const [verification] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
  const ErrorMsg = () => {
    if (errorMsg === "")
      return null;
    return (
      <Alert severity='error'>
        <AlertTitle>請注意</AlertTitle>
        {errorMsg}
      </Alert>
    );
  }
  const submit = () => {
    const errorList = [];
    let errorMsg = "";
    let errorOccurred = false;
    if (mail === "") {
      errorMsg += "未填寫mail資訊";
      errorList.push("className");
      errorOccurred = true;
    }
    if (verification === "") {
      errorMsg += "  未填寫驗證碼";
      errorList.push("vertification");
      errorOccurred = true;
    }
    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorOccurred)
      return;
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography component="h4" variant="h4" align="center">
          忘記密碼
        </Typography>
        <ErrorMsg />
        <div className={classes.box}>
          <Grid container spacing={3} justify='center'>
            {/* 信箱 */}
            <Grid
              item xs={12} md={12} justify='center'
              container alignItems="flex-end" spacing={1}
            >
              <Grid item xs={10} sm={6} md={4} alignItems="flex-end">
                <TextField
                  id="mail"
                  label="信箱"
                  error={errorComponent.includes("mail")}
                  value={mail}
                  onChange={(event) => setMail(event.target.value)}
                  fullWidth
                  required
                  autoComplete="current-username"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            {/* 驗證碼 */}
            <Grid
              item xs={12} md={12} justify='center'
              container alignItems="flex-end" spacing={1}
            >
              <Grid item xs={10} sm={6} md={4} >
                <HCaptcha
                  sitekey="e4d88672-ae53-448a-964b-317d1563b6fd"
                  onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                />
              </Grid>
            </Grid>
            <Grid
              item xs={12} md={4} justify='center'
              container alignItems="flex-end" spacing={1}
            >
              <Button
                onClick={submit}
                variant="contained"
                color="primary"
              >
                寄送密碼重設信件
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  )
}

export default ForgetPassword
