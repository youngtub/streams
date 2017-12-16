const models = require('../db/models/core.js');
const Activity = models.Activity;
const Participation = models.Participation;
const Org = models.Org;
const Main = models.Main;

/*

const Activity = db.define('activity', {
  title:  Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.DATE,
  reference: Sequelize.STRING,
  location: Sequelize.STRING,
  ongoing: Sequelize.BOOLEAN,
  type: Sequelize.STRING

  Activity.belongsTo(Org, {through: 'orgId'})
  Activity.belongsTo(Student, {through: 'studentId'})
});

*/

exports.addActivity = (req, res) => {
  let studentId = req.body.id;
  let title = req.body.title;
  let date = req.body.date;
  let reference = req.body.reference;
  let location = req.body.location;
  let ongoing = req.body.ongoing;
  let type = req.body.type;
  let mainId = req.body.mainId || null;
  return Activity.create({
    studentId, title, date, reference, location, ongoing, type, mainId
  })
  .then((newAct) => {
    res.send(newAct.dataValues)
  })
};

exports.addMain = (req, res) => {
  let title = req.body.title;
  let studentId = req.body.id;
  return Main.create({title, studentId})
  .then((newMain) => res.send(main))
  .catch(err => console.log('err adding main: ', err))
}

exports.getAllActivities = (req, res) => {
  let studentId = req.query.id;
  return Activity.findAll({
    where: {studentId, mainId: null}
  })
  .then((arr) => {
    res.send(arr)
  })
}

exports.getMains = (req, res) => {
  let studentId = req.query.id;
  return Main.findAll({
    where: {studentId}
  })
  .then((arrOfMains) => {
    var mainIds = arrOfMains.reduce((acc, curr) => {
      acc.push(curr.dataValues.id); return acc;
    }, [])
    return Promise.all(mainIds.map(id => getActivitiesOfMain(id, studentId)))
    .then((arrsOfMainActivities) => res.send(arrsOfMainActivities))
    .catch(err => console.log('err fetching mains: ', err))
  })
};

getActivitiesOfMain = (mainId, studentId) => {
  return Activity.findAll({
    where: {mainId, studentId}
  })
  .then((arr) => arr)
}
