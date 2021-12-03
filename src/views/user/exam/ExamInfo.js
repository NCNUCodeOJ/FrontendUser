import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Paper, Typography, Grid,
  Box, InputBase, Button,
  TextField
} from '@material-ui/core/';
import {
  Star, StarHalf, StarBorder
} from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import ErrorMsg from '../pkg/ErrorMsg';

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
  errorFont: {
    color: '#ff0000',
  }
}));

function createData(type, question, option1, option2, option3, option4) {
  return { type, question, option1, option2, option3, option4 };
  // type:
  // 1:選擇
  // 2:是非
  // 3:簡答
}

function countDifficultyStar(difficulty) {
  var stars = [];
  var i = 0;
  while (i < difficulty) {
    if (difficulty - i !== 0.5) {
      stars.push(<Star />);
    } else {
      stars.push(<StarHalf />);
    }
    i++;
  }
  if (i !== 5) {
    var remainDifficulty = 5 - i;
    for (var t = 0; t < remainDifficulty; t++) {
      stars.push(<StarBorder />);
    }
  }
  return stars;
}

const Info = () => {
  const classes = useStyles();
  const history = useHistory();
  const title = "TEST1: input & output";
  const isLogin = useSelector(state => state.isLogin);
  // 難度
  var difficulty = 2.5;
  const difficultyStars = countDifficultyStar(difficulty);
  const Questionrows = [
    createData(1, '請問在python中print( )的用途是?', '輸入', '條件判斷式', '輸出', '定義變數'),
    createData(2, '在python中input( )是輸出'),
    createData(3, '請問在python中輸出是?')
  ];
  const [MultipleAnswer, setMultipleAnswer] = useState("");
  const [TrueFalseAnswer, setTrueFalseAnswer] = useState("");
  const [ShortAnswer, setShortAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);

  if (!isLogin) {
    return (
      <Redirect to="/" />
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
    let errorOccurred = false;
    if (MultipleAnswer !== "1" && MultipleAnswer !== "2" && MultipleAnswer !== "3" && MultipleAnswer !== "4") {
      errorMsg += "選擇題請填寫1-4其中一個編號 ";
      errorList.push("MultipleAnswer");
      errorOccurred = true;
    }
    if (TrueFalseAnswer !== "T" && TrueFalseAnswer !== "F") {
      errorMsg += "是非題請填寫'T'或'F' ";
      errorList.push("TrueFalseAnswer");
      errorOccurred = true;
    }
    if (ShortAnswer === "") {
      errorMsg += "未填寫簡答題";
      errorList.push("ShortAnswer");
      errorOccurred = true;
    }
    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorOccurred)
      return;
  }

  return (
    <>
      <Typography component="h4" variant="h4" align="left">
        {title}
      </Typography>
      <ErrorMsg msg={errorMsg} />
      <Paper className={classes.paper}>
        <Typography variant="h6"  >
          難度:
          {difficultyStars}
        </Typography>
        <Typography variant="h6" color="error">
          剩餘時間: 21小時
        </Typography>
        <div className={classes.box}>
          <Grid container spacing={3}>
            {
              Questionrows.map((obj) => {
                if (obj.type === 1)
                  return (
                    <React.Fragment key={obj.num}>
                      <Grid
                        container item xs={12} md={12}
                        alignitems="center" spacing={5}
                      >
                        <Grid item xs={2} md={1}>
                          <nobr>
                            <Box component="span" fontSize="h6.fontSize"
                              className={errorComponent.includes("MultipleAnswer") ? classes.errorFont : null}>
                              1.(<InputBase
                                id="MultipleAnswer"
                                alignitems="center"
                                textalign="center"
                                className={classes.margin}
                                inputProps={{
                                  'aria-label': 'naked',
                                  'maxLength': 1
                                }} type='text'
                                onChange={(event) => setMultipleAnswer(event.target.value)}
                                error={errorComponent.includes("MultipleAnswer")} />)
                            </Box>
                          </nobr>
                        </Grid>
                        <Grid item xs={10} md={10}>
                          <Box component="span" fontSize="h6.fontSize">
                            {obj.question}
                          </Box>
                          <br/>
                          <Box component="span" fontSize="h6.fontSize">
                            (A) {obj.option1}
                            (B) {obj.option2}
                            (C) {obj.option3}
                            (D) {obj.option4}
                          </Box>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                else if (obj.type === 2)
                  return (
                    <React.Fragment key={obj.num}>
                      <Grid
                        container item xs={12} md={12}
                        alignitems="center" spacing={5}
                      >
                        <Grid item xs={2} md={1}>
                          <nobr>
                            <Box component="span" fontSize="h6.fontSize"
                              className={errorComponent.includes("TrueFalseAnswer") ? classes.errorFont : null}>
                              2.(<InputBase
                                id="TrueFalseAnswer"
                                alignitems="center"
                                textalign="center"
                                className={classes.margin}
                                inputProps={{
                                  'aria-label': 'naked',
                                  'maxLength': 1
                                }} type='text'
                                onChange={(event) => setTrueFalseAnswer(event.target.value)}
                                error={errorComponent.includes("TrueFalseAnswer")} />)

                            </Box>
                          </nobr>
                        </Grid>
                        <Grid item xs={10} md={10}>
                          <Box component="span" fontSize="h6.fontSize">
                            {obj.question}
                          </Box>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                else if (obj.type === 3)
                  return (
                    <React.Fragment key={obj.num}>
                      <Grid
                        container item xs={12} md={12}
                        alignitems="center"
                      >
                        <Grid item>
                          <Box component="span" fontSize="h6.fontSize"
                            className={errorComponent.includes("ShortAnswer") ? classes.errorFont : null} >
                            3.
                          </Box>
                        </Grid>
                        <Grid item xs={11} md={11}>
                          <Box component="span" fontSize="h6.fontSize">
                            {obj.question}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs={10} md={10}
                        alignitems="center">
                        <TextField
                          id="ShortAnswer"
                          rows={8}
                          variant="outlined"
                          multiline
                          fullWidth
                          onChange={(event) => setShortAnswer(event.target.value)}
                          error={errorComponent.includes("ShortAnswer")} />
                      </Grid>
                    </React.Fragment>
                  );
                return null;
              })}
            <Grid
              container spacing={1} justify="center">
              <Grid item xs={6} md={4}>
                <Button
                  fullWidth
                  onClick={submit}
                  variant="contained"
                  color="primary"
                >
                  提交
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </Paper>
    </>
  )
}

export default Info

