import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt, faBell, faHouseUser, faSearch
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

const Item = (props) => {
  const x = props.item
  return (
    <>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={x.id}
      >
        <Typography align="center" className={props.className}>
          <FontAwesomeIcon icon={faBell} />
          {" " + x.homeWorkName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faCalendarAlt} />
              {"發佈時間：" + x.startTime}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faHouseUser} />
              {"發佈單位：" + x.endTime}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button fullWidth color="primary" variant="contained">
              {`查看         `}
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    </>
  );
}


const HomeWorkList = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
          "id": 15,
          "homeWorkName": "忘記密碼",
          "department": "dev",
          "remainingTime": "21小時",
          "startTime": "2021-02-28 00:00",
          "endTime": "管理員",
      },
      {
          "id": 12,
          "homeWorkName": "提交的建議",
          "department": "dev",
          "remainingTime": "2天",
          "startTime": "2021-02-29 00:00",
          "endTime": "程式設計",
      },
      {
          "id": 13,
          "homeWorkName": "第二個作業提示",
          "department": "dev",
          "remainingTime": "7天",
          "startTime": "2021-02-29 09:44",
          "endTime": "資料庫",
      },
  ]);
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        最新消息公告
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

export default HomeWorkList

// 小時等級 小時更新 以此類推
// ?id=
