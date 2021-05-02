import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { newHomeWorkSubmition } from '../../../api/user/api';
import grey from '@material-ui/core/colors/grey';
import {
  Paper, Typography, TextField,
  Button, Grid, FormControl,
  InputLabel, Select
} from '@material-ui/core/';
import {
  Star, StarHalf, StarBorder,
  FileCopyOutlined
} from '@material-ui/icons/';
import Editor from "@monaco-editor/react";

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

const Info = () => {
  const classes = useStyles();
  const history = useHistory();
  const isLogin = useSelector(state => state.isLogin);
  const [allTestData, setAllTestData] = useState([]);
  const [allLanguageName, setAllLanguageName] = useState([]);
  const [languageState, setLanguageState] = useState(0);
  const [allInfo, setAllInfo] = useState([])
  useEffect(() => {
    const testData = [{
      "id": "0",
      "inputvalue": "1 1",
      "outputvalue": "2",
    }, {
      "id": "1",
      "inputvalue": "1 2",
      "outputvalue": "3",
    }]
    setAllTestData(testData);
  }, []);
  useEffect(() => {
    const languageFiles = [{
      name: "C",
      language: "C",
      value: "someCodeExample",
    }, {
      name: "Java",
      language: "Java",
      value: "// System.out.println('Hello World');",
    }, {
      name: "PHP",
      language: "PHP",
      value: "<!-- echo 'Hello World!';  -->",
    }, {
      name: "Python",
      language: "Python",
      value: "# print('Hello World!')",
    }]
    setAllLanguageName(languageFiles);
  }, []);
  useEffect(() => {
    setAllInfo([
      {
        "id": "0",
        "difficulty": 3.5,
        "inputdescription": "兩個用空格分開的整數.",
        "ouputdescription": "兩數之和",
        "remainingTime": "2021-02-28 00:00",
        "description": "請計算出兩數之和，並輸出。"
      }
    ]);
  }, []);
  const handleLanguageChange = (event) => {
    setLanguageState(event.target.value);
  };
  const handleEditorChange = (value) => {
    console.log(value);
  }

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
    newHomeWorkSubmition()
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
    <>
      <Typography component="h4" variant="h4" align="left">
        HW1: Hello World!
      </Typography>
      <Paper className={classes.paper}>
        {allInfo.map((value) => {
          return (
            <>
              <Typography variant="h6"  >
                難度: {countHomeWorkStar(value.difficulty)}
              </Typography>
              <Typography variant="h6" color="error">
                剩餘時間: {value.remainingTime}
              </Typography>
              <Grid container className={classes.box}>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    說明: {value.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    輸入: {value.inputdescription}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" >
                    輸出: {value.ouputdescription}
                  </Typography>
                </Grid>
              </Grid>
            </>
          );
        })}

        <Grid item xs={12}>
          {allTestData.map((value, index) => {
            return (
              <Grid container key={value.id} spacing={3}>
                <ShowBox title="input" value={value.inputvalue} />
                <ShowBox title="output" value={value.outputvalue} />
              </Grid>
            );
          })}
        </Grid>
        <Grid item sx={12} md={10}>
          <Typography variant="h6" >
            評分標準:
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid container item xs={3} md={1} >
            <Typography variant="h6">
              繳交區:
            </Typography>
          </Grid>
          <Grid container item xs={10} md={5} >
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="language">
                Language
              </InputLabel>
              <Select native
                onChange={handleLanguageChange}
                value={languageState}
                id="language"
                name='languageSelected'
              >
                {allLanguageName.map((value, index) => {
                  return (
                    <option key={index} value={index}>{value.language}</option>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid container item xs={12} md={10} >
            <Editor
              height="60vh"
              theme="vs-dark"
              path={allLanguageName[languageState] ? allLanguageName[languageState].name : ''}
              language={allLanguageName[languageState] ? allLanguageName[languageState].language : ''}
              value={allLanguageName[languageState] ? allLanguageName[languageState].value : ''}
              onChange={handleEditorChange}
            />
          </Grid>
        </Grid >
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
      </Paper >

    </>
  )
}


export default Info
