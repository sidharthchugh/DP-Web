import express from 'express';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';
import gzip from 'compression';
import lusca from 'lusca';
import helmet from 'helmet';
import { sessionSecret, db } from './secrets';
import { ENV } from './appConfig';

const MongoStore = connectMongo(session);

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
      app.use(gzip());
      // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
      app.use(helmet());
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 10000, limit: '50mb' })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());

  app.use(express.static(path.join(__dirname, '../..', 'public'), { maxAge: 31557600000 }));

  app.set('trust proxy', 'loopback');
  const sess = {
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new MongoStore(
     {
       url: db,
       autoReconnect: true
     }
   )
  };

  if (ENV === 'development') {
    console.log(`===>  Environment: ${ENV}`);
    console.log(`===>  Listening on port: ${app.get('port')}`);
  }
  console.log('===>  Successfully Connected to Database');

  if (process.env.BASE_ENV === 'production') {
    sess.cookie.secure = true; // Serve secure cookies
  }

  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

 // Application Security Middleware
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
};
