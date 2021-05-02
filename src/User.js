import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/user/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/user/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const ForgetPassword = React.lazy(() => import('./views/pages/forgetPassword/ForgetPassword'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page403 = React.lazy(() => import('./views/pages/page403/Page403'));


class User extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/forgetPassword" name="forgetPassword Page" render={props => <ForgetPassword {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/403" name="Page 403" render={props => <Page403 {...props} />} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    );
  }
}

export default User;
