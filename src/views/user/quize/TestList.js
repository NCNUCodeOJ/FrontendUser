import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Paper, Typography, Grid,
  Button,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
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
    textAlign: 'left',
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  }
}));

const TestList = () => {
  const classes = useStyles();
  const isLogin = useSelector(state => state.isLogin);
  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <>
      <Typography component="h4" variant="h4" align="center">
        測驗清單
      </Typography>
      <Paper className={classes.paper}>
        <div className={classes.box}>
          <Grid flexWrap="wrap" spacing={3} justify='center' >
            剩餘時間
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              Test 1: Hello World
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              Test 2 : 判斷閏年
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              Test 3 : 八皇后
            </Button>
          </Grid>

        </div>
      </Paper>
    </>
  )
}

export default TestList
