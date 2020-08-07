import './configs/ReactotronConfig.js';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Layout } from './utility/context/Layout';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './redux/storeConfig/store';
import Spinner from './components/@vuexy/spinner/Fallback-spinner';
import './index.scss';
import './@fake-db';
import App from './App';
import history from './history';

// configureDatabase()
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Router history={history}>
            <App />
          </Router>
        </Layout>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
