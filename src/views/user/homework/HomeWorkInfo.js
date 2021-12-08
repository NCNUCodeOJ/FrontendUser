import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import JSONbig from 'json-bigint';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import {
  Paper, Typography, TextField,
  Button, Grid, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Card,
  CssBaseline
} from '@material-ui/core/';
import {
  Star, StarHalf, StarBorder,
  FileCopyOutlined
} from '@material-ui/icons/';
import Editor from "@monaco-editor/react";
import { getHomeWorkInfo, createHomeWork, getHomeWorkSubmission } from 'src/api/user/problem/api';

function createData(line, column, rule, description) {
  return { line, column, rule, description };
}

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

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const countHomeWorkStar = (difficulty) => {
  let stars = [];
  let i = 0;
  for (i = 0; i < difficulty; i++) {
    if (difficulty - i !== 0.5) {
      stars.push(<Star key={"star" + i} />);
    } else {
      stars.push(<StarHalf key={"star" + i} />);
    }
  }
  for (; i < 5; i++) {
    stars.push(<StarBorder key={"star" + i} />);
  }
  return stars;
}

const ShowBox = (prop) => {
  const element = useRef();
  const onCopyClick = (e) => {
    e.current.select()
    document.execCommand("copy");
  };
  return (
    <Grid item sx={12} md={6}>
      <Typography variant="h6" >
        {prop.title}
        <Button>
          <FileCopyOutlined onClick={() => onCopyClick(element)} />
        </Button>
      </Typography>
      <TextField
        inputRef={element}
        defaultValue={prop.value}
        InputProps={{ readOnly: true }}
        variant="outlined"
        fullWidth
      />
    </Grid>
  );
}

const HomeWorkInfo = ({ match }) => {
  const classID = match.params.cid;
  const problemID = match.params.pid;
  const submissionID = '717137588017299458';

  console.log('classID ' + classID);
  console.log('ProblemID ' + problemID);
  const classes = useStyles();
  const history = useHistory();
  const isLogin = useSelector(state => state.isLogin);
  const [HomeWorkInfo, setHomeWorkInfo] = useState([]);
  const [allTestData, setAllTestData] = useState([]);
  const [handleEditorChange, setHandleEditorChange] = useState('');
  const [homeWorkLanguage, setHomeWorkLanguage] = useState('');
  const [submitScore, setSubmitScore] = useState('');
  let remainingTime = null;
  let remainingTimeUnit = null;
  let currentTime = new Date().getTime() / 1000;;

  const token = localStorage.getItem('token');
  const showHomeWorkInfo = () => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    };
    const homeWorkData = [];

    getHomeWorkInfo(token, classID, problemID)
      .then((rs) => {
        rs.data.problem_id = problemID;
        rs.data.class_id = classID;
        homeWorkData.push(rs.data);
        setHomeWorkInfo(homeWorkData);
        setAllTestData(rs.data.samples);
        getLanguage(rs.data.language);
      })
      .catch((err) => {
        toast.error(err.response, options);
      })
    getHomeWorkSubmission(token, classID, problemID, submissionID)
      .then((rs) => {
        console.log(rs.data);
        var data = JSONbig.parse(rs.data);
        console.log(data.score.toString());

      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }
  useEffect(() => {
    showHomeWorkInfo(problemID,);
  }, []);
  function getLanguage(language) {
    const allLanguage = [{
      name: "C",
      language: "c",
      submitionLanguage: "c",
      value: `#include "config.h"`,
    },
    {
      name: "C++",
      language: "cpp",
      submitionLanguage: "cpp",
      value: `#include "pch.h""`,
    }, {
      name: "Java",
      language: "java",
      submitionLanguage: "java",
      value: "// System.out.println('Hello World');",
    }, {
      name: "Python3",
      language: "python",
      submitionLanguage: "python3",
      value: "# print('Hello World!')",
    }];
    for (let x = 0; x < allLanguage.length; x++) {
      if (language && language === allLanguage[x].submitionLanguage) {
        setHomeWorkLanguage(allLanguage[x]);
      }
    }
  }
  const rows = [
    // createData(2, 8, 'indentation', 'indentation is not a multiple of four'),
    // createData(25, 29, 'indentation', 'indentation contains tabs'),
    // createData(65, 11, 'comment', 'Missing function or method docstring (missing-function-docstring)'),
  ];

  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }

  const submit = () => {
    let errorOccurred = false;
    if (errorOccurred)
      return;
    if (handleEditorChange !== '') {
      const options = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      };
      const homeWorkData = {
        "source_code": handleEditorChange,
        "language": homeWorkLanguage.submitionLanguage
      }
      createHomeWork(token, classID, problemID, homeWorkData)
        .then((rs) => {
          toast.info('繳交成功', options);
          let data = JSONbig.parse(rs.data);
          toast.info(data.message, options);
          console.log(data.submission_id.toString());
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message, options);
          }
        })
    }
  }
  return (
    <>
      <Typography component="h4" variant="h4" align="left">
        {HomeWorkInfo.map((value) => {
          return (value.problem_name);
        })}
      </Typography>
      <Paper className={classes.paper}>
        {HomeWorkInfo.map((value) => {

          const startTime = value.start_time;
          var sdate = new Date(startTime * 1000);
          var smonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
          var syear = sdate.getFullYear();
          var smonth = smonths[sdate.getMonth()];
          var sday = sdate.getDate();

          let tempStartTime = syear + '-' + smonth + '-' + sday;
          var stime = new Date(startTime * 1000);
          var shour = stime.getHours();
          var smin = stime.getMinutes();
          var ssec = stime.getSeconds();
          tempStartTime += ' ' + shour + ':' + smin + ':' + ssec;

          const endTime = value.end_time;
          var date = new Date(endTime * 1000);
          var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
          var year = date.getFullYear();
          var month = months[date.getMonth()];
          var day = date.getDate();

          let tempEndTime = year + '-' + month + '-' + day;
          var time = new Date(endTime * 1000);
          var hour = time.getHours();
          var min = time.getMinutes();
          var sec = time.getSeconds();
          tempEndTime += ' ' + hour + ':' + min + ':' + sec;

          if (day - sday >= 1) {
            remainingTime = day - sday;
            remainingTimeUnit = '天';
          } else if (hour - shour >= 1) {
            remainingTime = hour - shour;
            remainingTimeUnit = '時';
          } else if (min - smin >= 1) {
            remainingTime = min - smin;
            remainingTimeUnit = '分';
          }
          return (
            <>
              <Typography variant="h6" >
                難度: {countHomeWorkStar(parseInt(value.tags_list))}
              </Typography>
              <Typography variant="h6" color="error">
                剩餘時間: {remainingTime + remainingTimeUnit}
              </Typography>
              <Grid container className={classes.box}>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    說明: {value.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    輸入說明: {value.input_description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    輸出說明: {value.output_description}
                  </Typography>
                </Grid>
              </Grid>

            </>
          );
        })}

        <Grid item xs={12}>
          {allTestData.map((value, index) => {
            return (
              <Grid container key={index} spacing={3}>
                <ShowBox title="input" value={value.input} />
                <ShowBox title="output" value={value.output} />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={1}>
          <Typography variant="h5">
            繳交區
          </Typography>
          <Grid container item xs={12} md={12} >
            <Typography variant="h6">
              繳交語言:
            </Typography>
            <Typography variant="h6">
              {homeWorkLanguage.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid container item xs={12} md={10} >
            <Editor
              height="60vh"
              theme="vs-dark"
              path={homeWorkLanguage ? homeWorkLanguage.name : ''}
              language={homeWorkLanguage ? homeWorkLanguage.language : ''}
              value={homeWorkLanguage ? homeWorkLanguage.value : ''}
              onChange={setHandleEditorChange}
            />
          </Grid>
        </Grid >

        <Grid container spacing={5} justify="center">
          <CssBaseline />
          <Grid container item xs={10} md={7} >
            <TableContainer component={Paper}>
              <Table sx={10} md={8} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Line</TableCell>
                    <TableCell align="center">Column</TableCell>
                    <TableCell >規則</TableCell>
                    <TableCell >描述</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.line}
                      </TableCell>
                      <TableCell align="center">{row.column}</TableCell>
                      <TableCell >{row.rule}</TableCell>
                      <TableCell >{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid container item xs={10} md={3} direction="column" justify="center" >
            <Card style={{ backgroundColor: "#2c387e" }}>
              <WhiteTextTypography variant="h4">
                分數:
              </WhiteTextTypography>
              <WhiteTextTypography variant="h2" align="center" >
                0
              </WhiteTextTypography>
            </Card>
          </Grid>
        </Grid>
<br/>
        <Grid
          container spacing={1} justify="center">
          <Grid item xs={6} md={4} spacing={1}>
            {HomeWorkInfo.map((value) => {
              if (value.start_time < currentTime) {
                return (
                  <Button
                    fullWidth
                    onClick={submit}
                    variant="contained"
                    color="primary"
                    spacing={2}
                  >
                    提交
                  </Button>
                );
              }
            })
            }
          </Grid>
        </Grid>
      </Paper >

    </>
  )
}


export default HomeWorkInfo
