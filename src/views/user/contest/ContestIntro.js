import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import {
  Paper, Typography, Grid
} from '@material-ui/core/';

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
    textalign: 'left',
  },
  filezone: {
    minWidth: 300,
    minHeight: 100,
    background: grey[50],
  },
  filebutton: {
    margin: 'auto',
    marginTop: 25,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Info = () => {
  const isLogin = useSelector(state => state.isLogin);
  const classes = useStyles();
  const [allIntro, setAllIntro] = useState([])
  useEffect(() => {
    setAllIntro([
      {
        "id": "0",
        "title": "第一次上機考",
        "startTime": "2021-02-28 00:00",
        "endTime": "2021-02-28 23:59",
        "status": "非公開",
      }
    ]);
  }, []);

  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>
      {
        allIntro.map((x) => {
          return (
            <>
              <Typography component="h4" variant="h4" align="left">
                {x.title}
              </Typography>
              <Paper className={classes.paper}>
                <Typography variant="h6">
                  開始時間: {x.startTime}
                </Typography>
                <Typography variant="h6">
                  結束時間: {x.endTime}
                </Typography>
                <Grid container className={classes.box}>
                  <Grid item xs={12}>
                    <Typography variant="h6" >
                      狀態: {x.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper >
            </>);
        })}

    </>
  )
}


export default Info
