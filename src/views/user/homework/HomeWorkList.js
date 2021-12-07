import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import JSONbig from 'json-bigint';
import {
  Grid, Typography,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen, faClock
} from '@fortawesome/free-solid-svg-icons';
import { getHomeWorkList, getHomeWorkInfo } from 'src/api/user/problem/api';

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

const Item = (props) => {
  const x = props.item;
  let remainingTime = null;
  let remainingTimeUnit = null;
  const history = useHistory()

  const startTime = x.start_time;
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

  const endTime = x.end_time;
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={x.problem_id}
        >
          <Typography className={props.className}>
            <FontAwesomeIcon icon={faBookOpen} />
            {` ${x.problem_name} ----- 剩餘時間 : ${remainingTime + remainingTimeUnit}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faClock} />
                {"開始時間：" + tempStartTime}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faClock} />
                {"到期時間：" + tempEndTime}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button fullWidth color="primary"
                variant="contained"
                onClick={() => history.push(`/course/homeworkinfo/${props.classID}/${x.problem_id}`)}>
                進入
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}


const HomeWorkList = ({ match }) => {
  const classID = match.params.id.toString();
  // console.log('ClassID ' + classID);

  const classes = useStyles();
  const [allHomeWork, setAllHomeWork] = useState([]);

  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };
  const showHomeWorkList = () => {
    const token = localStorage.getItem('token');
    getHomeWorkList(token, classID)
      .then((rs) => {
        var data = JSONbig.parse(rs.data);
        // console.log('ProblemID ' + data.problems[1].toString())
        const tempHWID = data.problems;
        const homeWorkData = [];
        getHomeworkIndiData(token, tempHWID, classID, homeWorkData);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message, options);
        }
      })
  }
  useEffect(() => {
    showHomeWorkList();
  }, []);

  function getHomeworkIndiData(token, tempHWID, classID, homeWorkData) {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    };
    let temp = null;
    temp = tempHWID.pop();
    // console.log('ProblemID-- ' + temp.toString());
    getHomeWorkInfo(token, classID, temp.toString())
      .then((rs) => {
        rs.data.problem_id = temp.toString();
        rs.data.class_id = classID;
        homeWorkData.push(rs.data);

        if (tempHWID.length > 0) {
          getHomeworkIndiData(token, tempHWID, classID, homeWorkData);
        } else {
          setAllHomeWork(homeWorkData);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message, options);
        }
      })
  }
  return (
    <>
      <Typography align="center" variant="h4">
        作業清單
      </Typography>
      <div className={classes.root}>
        {
          allHomeWork.map((x) => (<Item key={x.problem_id} item={x} className={classes.heading} classID={classID} />))
        }
      </div>
    </>
  );
}

export default HomeWorkList
