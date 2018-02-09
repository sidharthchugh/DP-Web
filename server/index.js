import express from 'express';
import webpack from 'webpack';
import rollbar from 'rollbar';
import pmx from 'pmx';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { db } from './config/secrets';
import {ENV} from './config/appConfig';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';

const App = require('../public/assets/server');
// Path for Accessing Database on Production
const app = express();
let opbeat;
let options;


if (ENV === 'production') {
  // opbeat for endpoint and mongodb tracking
  opbeat = require('opbeat').start({
    appId: '682377c173',
    organizationId: 'a6a2fc392a6d4094a27c5d12b99d8b32',
    secretToken: '4f6ffb254760db94aa50f48229a40967b751250b'
  });

  // Keymetrics exception logging
  pmx.init({
    http: true, // HTTP routes logging (default: false)
    http_latency: 200,  // Limit of acceptable latency
    http_code: 500,  // Error code to track'
    alert_enabled: true,  // Enable alerts (If you add alert subfield in custom it's going to be enabled)
    ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (default: [])
    errors: true, // Exceptions loggin (default: true)
    custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics (default: true)
    network: true, // Network monitoring at the application level (default: false)
    ports: true  // Shows which ports your app is listening on (default: false)
  });

  // Rollbar error Logging
  rollbar.init('26aa13ad2c014bba878ccfe500d43395');
  rollbar.handleUncaughtExceptionsAndRejections();
}
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
 const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db, options, (err) => { // eslint-disable-line
      if (err) {
        console.log('===>  Error connecting to Database');
        console.log('Reason: ${err}');
      } else {
        console.log('===>  Succeeded in connecting to Database');
      }
    });
  };
 connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Register schema as mongoose model
const modelPath = path.join(__dirname, 'models');
fs.readdirSync(modelPath).forEach((file) => {
  if (~file.indexOf('.js')) require(`${modelPath}/${file}`);
});

passportConfig();

if (ENV === 'development') {
  const config = require('../webpack/webpack.config.dev-client');

  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
/*
 * Bootstrap application settings
 */
expressConfig(app);
/*
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);
/*
* This is where the magic happens. We take the locals data we have already
* fetched and seed our stores with data.
* App is a function that requires store data and url
* to initialize and return the React-rendered html string
 */

app.get('*', App.default);

if (ENV === 'production') {
  // any errors caught by Express can be logged by Opbeat as well
  app.use(opbeat.middleware.express());
 // Rollbar Error Handling
 // Use the rollbar error handler to send exceptions to your rollbar account
 app.use(rollbar.errorHandler('26aa13ad2c014bba878ccfe500d43395'));
}

app.listen(app.get('port'));
