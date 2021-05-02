import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  Container, Fade, CssBaseline
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// routes config
import routes from '../../routes/user'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));


const TheContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth={false}>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <Fade>
                      <route.component {...props} />
                    </Fade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </Container>
    </div>
  )
}

export default React.memo(TheContent)
