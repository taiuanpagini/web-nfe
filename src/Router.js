import React, { Suspense, lazy } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { history } from './history'
import { connect } from 'react-redux'
import Spinner from './components/@vuexy/spinner/Loading-spinner'
import { ContextLayout } from './utility/context/Layout'

// Route-based code splitting
const Home = lazy(() =>
  import('./views/pages/Home')
)

const Page2 = lazy(() =>
  import('./views/pages/Page2')
)

const Login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

const signed = false

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  isPrivate,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              !signed
                ? context.fullLayout
                : context.VerticalLayout
                if (!signed && isPrivate) {
                  return <Redirect to="/" />;
                }

                if (signed && !isPrivate) {
                  return <Redirect to="/dashboard" />;
                }
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                    <ToastContainer autoClose={3000} />
                  </Suspense>
                </LayoutTag>
              )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)

const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            path="/"
            exact
            component={Login}
            fullLayout
          />
          <AppRoute
            path="/dashboard"
            component={Home}
            isPrivate
          />
          <AppRoute
            path="/page2"
            component={Page2}
            isPrivate
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
