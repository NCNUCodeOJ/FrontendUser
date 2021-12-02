import React from 'react';
import {
  Typography, Paper, Grid
} from '@material-ui/core/';

const AnnouncementContent = () => {
  return (
    <>
      <Typography align="center" variant="h4">
        忘記密碼
      </Typography>
      <br/>
      <Paper>
        <Grid align="center">
          <h3>忘記密碼的話，可以填入信箱並輸入驗證碼取得重設密碼權限喔!</h3>
        </Grid>
      </Paper>
    </>
  );
}

export default AnnouncementContent

