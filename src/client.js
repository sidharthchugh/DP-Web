import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import preRenderMiddleware from './middlewares/preRenderMiddleware';
import initOpbeat from 'opbeat-react';
import 'opbeat-react/router';

// load jquery and foundation in the window scope
import 'script!jquery';
import 'script!what-input';
import strings from 'components/util/language';

/* eslint-enable */
if (strings.getInterfaceLanguage() !== 'de' || strings.getInterfaceLanguage() !== 'en') {
  strings.setLanguage('en');
}

import {ENV} from '../server/config/appConfig';

if (ENV === 'production') {
  // Enable opbeat for React
  initOpbeat({
    organizationId: 'a6a2fc392a6d4094a27c5d12b99d8b32',
    appId: '682377c173'
  });
}

require('font-awesome-webpack');

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

function onUpdate() {
  // Scroll Everytime to Top of the Page and Scroll to the Element
  const hash = window.location.hash;
       if (hash) {
         const element = document.querySelector(hash);
         if (element) {
             element.scrollIntoView();
         }
       } else {
          window.scrollTo(0, 0);
     }
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  if (window.__INITIAL_STATE__ !== undefined) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  const { components, params } = this.state;

  preRenderMiddleware(store.dispatch, components, params);
}

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
