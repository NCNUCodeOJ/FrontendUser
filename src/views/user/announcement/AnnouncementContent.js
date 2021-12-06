import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Grid
} from '@material-ui/core/';
import { getAnnouncementList } from 'src/api/user/announcement/api';

const Item = (props) => {
  const x = props.item;
  return (
    <>
      {(() => {
        if (props.currentID == x.announcement_id) {
          console.log(x.announcement_id);
          return (
            <>
              <Typography key={x.announcement_id} align="center" variant="h4">{x.title}</Typography>
              <Paper>
                <Grid align="center">
                  <h3>{x.content}</h3>
                </Grid>
              </Paper>
            </>
          );
        }
      })()}
    </>
  );
}

const AnnouncementContent = ({ match }) => {
  const currentID = match.params.id;
  console.log(currentID);
  const [announcement, getAllAnnouncement] = useState([]);
  const showAnnouncementList = () => {
    getAnnouncementList()
      .then((rs) => {
        const allAnnouncement = rs.data.announcements;
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
      <div announcement={announcement}>
        {
          announcement.map((x) => (
            <Item key={x.announcement_id} item={x} currentID={currentID} />
          ))
        }
      </div>
      <br />
    </>
  );
}

export default AnnouncementContent
