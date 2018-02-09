import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createOpbeatMiddleware } from 'opbeat-react/redux';
import axiosMiddleware from 'redux-axios-middleware';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import axios from 'axios';
import {ENV} from '../../server/config/appConfig';

let client;
let store;

/*
 * Store Configurations
 *
 * @param {Object}         Initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} A history object. `createMemoryHistory` for server-side rendering
 *                         and `browserHistory` for client-side rendering.
 */
export default function configureStore(initialState, history) {
  if (ENV === 'production') {
      client = axios.create({  // all axios can be used, shown in axios documentation
      baseURL: process.env.BASE_URL,
      responseType: 'json'
    });
  } else {
      client = axios.create({  // all axios can be used, shown in axios documentation
      baseURL: 'http://localhost:3000',
      responseType: 'json'
      });
  }

  // Adding UserID with every Request
  const axiosMiddlewareOptions = {
    interceptors: {
        request: [
            (getState, config) => {
                if (initialState.user.authenticated === true) {
                    config.headers.id = initialState.user.userObj._id;
                    config.headers.firstname = initialState.user.userObj.firstName;
                    config.headers.lastname = initialState.user.userObj.lastName;
                    config.headers.userid = initialState.user.userObj.userId;
                    config.headers.emailid = initialState.user.userObj.email;
                    config.headers.roles = initialState.user.userObj.role;
                }
                return config;
            }
        ],
        response: [
            (getState, response) => {
                return response;
            }
        ]
    }
  };

  // Dev middlewares
  const devMiddlewares = [
    // Wrap all your http requests into http client with Promise support
    axiosMiddleware(client, axiosMiddlewareOptions),
    // Keep react-router sync with redux store
    routerMiddleware(history)
  ];

  // Prod middlewares
  const prodMiddlewares = [
    // Wrap all your http requests into http client with Promise support
    axiosMiddleware(client, axiosMiddlewareOptions),
    // Keep react-router sync with redux store
    routerMiddleware(history),
    createOpbeatMiddleware()
  ];


  // Development middlewares
  if (ENV === 'development') {
     // devMiddlewares.push(createLogger());

    store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...devMiddlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...prodMiddlewares), f => f));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
