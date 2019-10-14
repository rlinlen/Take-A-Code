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

const {sequelize, Proj, Dict, ProjItemDict, ProjectItemTaken, User, DictSplit} = require('./services/sequelize');
// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);


////Init express
const app = express();

require('./services/passport')(User);

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
  secret: (keys()).cookieEncryptionKeys[0],
  cookie: {maxAge: 24*60*60 * 1000},
  store: myStore,
  resave: false,
  saveUninitialized: false
}));
myStore.sync();

app.use(passport.initialize());
app.use(passport.session());

////Routing
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app, User);
require('./routes/projRoutes')(app, Proj);
require('./routes/dictRoutes')(app, Dict);
require('./routes/dictSplitRoutes')(app, DictSplit);
require('./routes/projItemDictRoutes')(app, ProjItemDict);
require('./routes/takenRoutes')(app, ProjectItemTaken);
////Start Server

if (process.env.NODE_ENV === 'production') {
  console.log('hi')
  console.log(conf().webPrivateKey)
  console.log(__dirname)

  const path = require('path');
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  //app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, 'client','build')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



  
const PORT = process.env.PORT || 5001;

// Certificate
const privateKey = fs.readFileSync(__dirname + conf().webPrivateKey, 'utf8');
const certificate = fs.readFileSync(__dirname + conf().webCertificate, 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        //ca: ca
    };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port ' + PORT);
})