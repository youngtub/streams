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
  involvement: Sequelize.BOOLEAN,
  type: Sequelize.STRING

  Activity.belongsTo(Org, {through: 'orgId'})
  Activity.belongsTo(Student, {through: 'studentId'})
});

*/

exports.addActivity = (req, res) => {
  let studentId = req.body.id;
  let title = req.body.title;
  let description = req.body.description;
  let date = req.body.date;
  let reference = req.body.reference;
  let location = req.body.location;
  let involvement = req.body.involvement;
  let type = req.body.type;
  let mainId = req.body.mainId || null;
  let version = req.body.version || null;
  if(version === null) {
    return Activity.findAll({
      where: {studentId}
    })
    .then((allActs) => {
      if(allActs.length === 0) version = 0;
      else {
        var maxVer = allActs.reduce((acc, curr) => {
          let tempV = curr.dataValues.version
          if(tempV > acc) acc = tempV;
          return acc;
        }, 0)
        version = maxVer+1
      }
    })
    .then(() => {
      return Activity.create({
        studentId, title, description, date, reference, location, involvement, type, mainId, version
      })
      .then((newAct) => {
        res.send(newAct.dataValues)
      })
    })
  }
  return Activity.create({
    studentId, title, description, date, reference, location, involvement, type, mainId, version
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
    var maxVer = arr.reduce((acc, curr) => {
      let tempV = curr.dataValues.version
      if(tempV > acc) acc = tempV;
      return acc;
    }, 0);
    var output = arr.filter(item => item.dataValues.version === maxVer)
    res.send(output)
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
    .then((arrsOfMainActivities) => {
      arrOfMains.forEach((main, i) => main.dataValues['activities'] = arrsOfMainActivities[i])
      console.log('mainsAttached?', arrOfMains[0].dataValues)
      res.send(arrOfMains)
    })
    .catch(err => console.log('err fetching mains: ', err))
  })
};

getActivitiesOfMain = (mainId, studentId) => {
  return Activity.findAll({
    where: {mainId, studentId}
  })
  .then((arr) => {
    var maxVer = arr.reduce((acc, curr) => {
      let tempV = curr.dataValues.version
      if(tempV > acc) acc = tempV;
      return acc;
    }, 0);
    var output = arr.filter(item => item.dataValues.version === maxVer)
    return output;
  })
}
