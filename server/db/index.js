const Sequelize = require('sequelize');

const streams = new Sequelize('streams', 'ar', 'time4streams', {
  host: 'streams.cptd6imgxskl.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

streams.authenticate()
.then(() => {
console.log('Connected to Streams DB');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

module.exports = {streams};
