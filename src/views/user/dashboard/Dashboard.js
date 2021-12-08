import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Grid, Typography,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt, faBell, faHouseUser, faSearch, faMailBulk
} from '@fortawesome/free-solid-svg-icons';
import { getAnnouncementList } from 'src/api/user/announcement/api';

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
  const history = useHistory()

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={x.announcement_id}
        >
          <Typography align="center" className={props.className}>
            <FontAwesomeIcon icon={faBell} />
            {" " + x.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faCalendarAlt} />
                &nbsp;&nbsp;
                {"發佈時間：" + x.created_at}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography align="center">
                <FontAwesomeIcon icon={faHouseUser} />
               &nbsp;&nbsp;
                {"發佈單位：" + x.publisher}
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button fullWidth color="primary" variant="contained" onClick={() => history.push(`/announcement/${x.announcement_id}`)}>
                {`查看`}
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

const AnnouncementList = () => {
  const classes = useStyles();
  const [announcement, getAllAnnouncement] = useState([]);
  const showAnnouncementList = () => {
    getAnnouncementList()
      .then((rs) => {
        const allAnnouncement = rs.data.announcements
        getAllAnnouncement(allAnnouncement);
      })
      .catch((error) => {
        console.log(error.response);
      })
  };
  useEffect(() => {
    showAnnouncementList();
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        最新消息公告
      </Typography>
      <div className={classes.root}>
        {
          announcement.map((x) => (
            <Item key={x.announcement_id} item={x} className={classes.heading} />
          ))
        }
      </div>
    </>
  );
}

export default AnnouncementList
