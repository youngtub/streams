const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const db = require('./server/db');
const router = require('./server/router.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const core = require('./server/db/models/core.js')

const app = express();

app.use(bodyParser.json({ limit: '50mb'} ));
app.use(compression())
app.use(express.static(__dirname + '/ui'));

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(session({
  secret: 'boolin',
  cookie: {
    maxAge: 70000,
    saveUninitialized: true,
    secure: !true
  }
}))

app.use('/api', router)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/ui/index.html');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
