import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: 'auto'
  },
  content: {
    padding: theme.spacing(2),
    height: 100,
    width: 600,
  },
})
);

const QAEdit = (props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog open={props.QAEditopen} color="primary">
        <DialogTitle className={classes.title} color="primary">
          <Typography variant="h4">
            新增問題
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.content} color="primary">
          <TextField
              label="Question"
              placeholder="寫點甚麼..."
              multiline
              variant="outlined"
              className={classes.textField}
              justifyContent="center"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            發問
          </Button>
          <Button variant="outlined" onClick={props.handleQAEditClose}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default QAEdit
