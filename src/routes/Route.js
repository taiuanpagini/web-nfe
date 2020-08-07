/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { ContextLayout } from '../utility/context/Layout';
import { store } from '~/redux/storeConfig/store';

// import { store } from '~/redux/storeConfig/store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // return <Route {...rest} render={(props) => <Component {...props} />} />;

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              const LayoutTag = !signed
                ? context.fullLayout
                : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                    <ToastContainer autoClose={3000} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
}
