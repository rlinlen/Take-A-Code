const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser'); 

var cookieParser = require('cookie-parser');
const passport = require('passport');
var expressSession = require('express-session');

const https = require('https');
const fs = require('fs');
const keys = require('./config/keys');
const conf = require('./config/conf');

const {sequelize, Project} = require('./services/sequelize');
// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

////Init express
const app = express();

  app.use(helmet());
  app.set('trust proxy', false);

  //app.use(cookieParser(keys.cookieEncryptionKeys[0]));

  app.use(bodyParser.urlencoded({ extended : true  }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  var myStore = new SequelizeStore({
    db: sequelize
    })
  app.use(expressSession({
    secret: keys.cookieEncryptionKeys[0],
    cookie: {maxAge: 24*60*60 * 1000},
    store: myStore,
    resave: false,
    saveUninitialized: false
  }));
  myStore.sync();

  app.use(passport.initialize());
  app.use(passport.session());

  ////Routing
  require('./routes/projectRoutes')(app, Project);

  ////Start Server
  
const PORT = process.env.PORT || 5001;

// Certificate
const privateKey = fs.readFileSync(__dirname + conf.webPrivateKey, 'utf8');
const certificate = fs.readFileSync(__dirname + conf.webCertificate, 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        //ca: ca
    };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port 5001');
})