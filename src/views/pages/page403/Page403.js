import React from 'react'
import {
  Container, Card, CssBaseline, Typography,
  CardActions, CardContent, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Page404 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth={false}>
      <Card className={classes.root}>
      <CardContent>
        <Typography variant="h2" component="h2">
          錯誤 403
        </Typography>
        <Typography variant="body2" component="p">
          無權限
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" href="/">返回首頁</Button>
      </CardActions>
    </Card>
      </Container>
    </div>
  )
}

export default Page404
