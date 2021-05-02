import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  ArrowBack, QuestionAnswer,
  LibraryBooks, MenuBook, GpsFixedOutlined, Equalizer
} from '@material-ui/icons/';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen, faClock
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const Item = (props) => {
  const x = props.item;
  const dispatch = useDispatch();
  const backToContestList = () => {
    dispatch({ type: 'set', customNavBar: null });
  };
  const goToContestIntro = () => {
    dispatch({
      type: 'set', customNavBar: () => {
        return (
          <>
            <ListItemLink button onClick={backToContestList} href="#contest/contestlist">
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary="返回" />
            </ListItemLink>
            <ListItemLink href={`#contest/contestintro/${x.id}`}>
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText primary="簡介" />
            </ListItemLink>
            <ListItemLink href={`#contest/questionlist/${x.id}`}>
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="題目" />
            </ListItemLink>
            <ListItemLink href={`#contest/statuspage/${x.id}`}>
              <ListItemIcon>
                <GpsFixedOutlined />
              </ListItemIcon>
              <ListItemText primary="狀態" />
            </ListItemLink>
            <ListItemLink href={`#contest/qalist/${x.id}`}>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="QA" />
            </ListItemLink>
            <ListItemLink href={`#contest/rankpage/${x.id}`}>
              <ListItemIcon>
                <Equalizer />
              </ListItemIcon>
              <ListItemText primary="排行榜" />
            </ListItemLink>
          </>
        )
      }
    });
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={x.id}
        >
          <Typography className={props.className}>
            <FontAwesomeIcon icon={faBookOpen} />
            {` ${x.homeWorkName} ----- 剩餘時間 : ${x.remainingTime}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faClock} />
                {"開始時間：" + x.startTime}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faClock} />
                {"到期時間：" + x.endTime}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button fullWidth color="primary"
                variant="contained" onClick={goToContestIntro}
                href={`#contest/ContestIntro/${x.id}`}>
                進入
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}


const ContestList = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
        "id": 15,
        "homeWorkName": "Hello World",
        "department": "dev",
        "remainingTime": "21小時",
        "startTime": "2021-02-28 00:00",
        "endTime": "2021-03-03 23:59",
      },
      {
        "id": 12,
        "homeWorkName": "走馬炮",
        "department": "dev",
        "remainingTime": "2天",
        "startTime": "2021-02-29 00:00",
        "endTime": "2021-03-05 00:00",
      },
      {
        "id": 13,
        "homeWorkName": "判斷閏年",
        "department": "dev",
        "remainingTime": "7天",
        "startTime": "2021-02-29 09:44",
        "endTime": "2021-02-29 23:44:00",
      },
      {
        "id": 10,
        "homeWorkName": "八皇后",
        "department": "dev",
        "remainingTime": "13天",
        "startTime": "2021-02-29 16:29:00",
        "endTime": "2021-02-29 23:29:00",
      },
      {
        "id": 11,
        "homeWorkName": "馬拉松",
        "department": "dev",
        "remainingTime": "28天",
        "startTime": "2021-02-29 11:30:00",
        "endTime": "2021-02-29 23:30:00",
      }
    ]);
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        比賽清單
      </Typography>
      <div className={classes.root}>
        {
          allClass.map((x) => (
            <Item key={x.id} item={x} className={classes.heading} />
          ))
        }
      </div>
    </>
  );
}

export default ContestList
