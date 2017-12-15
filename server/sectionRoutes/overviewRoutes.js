const models = require('../db/models/core.js');
const Goal = models.Goal;
const Value = models.Value;
const Personality = models.Personality;
const Subjects = models.Subjects;
const Leadership = models.Leadership;
const Strength = models.Strength;

// GET

exports.getOverview = (req, res) => {
  let section = req.query.section;
  let id = req.query.id;
  let version = req.query.version || null;
  return gatherOverview(id, version)
  .then((dbentries) => {
    console.log('db entries obj: ', dbentries)
    res.send(dbentries)
  })
  .catch(err => console.log('err in db entries: ', err))
};

gatherOverview = (studentId, version) => {
  var output = {};
  return getPers(studentId, version)
  .then((pers) => {
    output['personality'] = pers;
    return getValues(studentId, version)
    .then((vals) => {
      output['values'] = vals;
      return getGoals(studentId, version)
      .then((goals) => {
        output['goals'] = goals;
        return output;
      })
    })
  })
};

getPers = (studentId, version) => {
  if(version === null) {
    return Personality.findAll({
      where: {studentId}
    })
    .then((allP) => {
      // find highest v
      var maxVer = allP.reduce((acc, curr) => {
        let tempV = curr.dataValues.version
        if(tempV > acc) acc = tempV;
        return acc;
      }, 0)
      //filter
      var currPs = allP.reduce((acc, curr) => {
        if(curr.dataValues.version === maxVer) acc.push(curr.dataValues);
        return acc;
      }, [])
      console.log('curr Ps', currPs)
      return currPs;
    })
  } else {
    return Personality.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

getValues = (studentId, version) => {
  if(version === null) {
    return Value.findAll({
      where: {studentId}
    })
    .then((allP) => {
      // find highest v
      var maxVer = allP.reduce((acc, curr) => {
        let tempV = curr.dataValues.version
        if(tempV > acc) acc = tempV;
        return acc;
      }, 0)
      //filter
      var currPs = allP.reduce((acc, curr) => {
        if(curr.dataValues.version === maxVer) acc.push(curr.dataValues);
        return acc;
      }, [])
      return currPs;
    })
  } else {
    return Value.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

getGoals = (studentId, version) => {
  if(version === null) {
    return Goal.findAll({
      where: {studentId}
    })
    .then((allP) => {
      // find highest v
      var maxVer = allP.reduce((acc, curr) => {
        let tempV = curr.dataValues.version
        if(tempV > acc) acc = tempV;
        return acc;
      }, 0)
      //filter
      var currPs = allP.reduce((acc, curr) => {
        if(curr.dataValues.version === maxVer) acc.push(curr.dataValues);
        return acc;
      }, [])
      return currPs;
    })
  } else {
    return Goal.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

// ADD

exports.addOverview = (req, res) => {
  let section = req.body.section;
  let obj = req.body.obj;
  let id = req.body.id;
  return createOverview(obj, id)
  .then((dbentries) => {
    console.log('db entries obj: ', dbentries)
    res.send(dbentries)
  })
  .catch(err => console.log('err in db entries: ', err))
}

createOverview = (obj, id) => {
  var output = {};
  return Promise.all(obj.goals.map(g => addGoals(g, id)))
  .then((newGoals) => {
    output['goals'] = newGoals
    return Promise.all(obj.values.map(v=>addValues(v, id)))
    .then((newVals) => {
      output['values'] = newVals;
      return Promise.all(obj.personality.map(p=>addPers(p, id)))
      .then((newPers) => {
        output['personality'] = newPers;
        return output
      })
      .catch(err=>console.log('err adding sec: ', err))
    })
    .catch(err=>console.log('err adding sec: ', err))
  })
  .catch(err=>console.log('err adding sec: ', err))
};

addPers = (p, id) => {
  return Personality.create({
    title: p.title,
    version: p.version,
    studentId: id
  })
  .then(newP => newP)
  .catch(err=>console.log('err adding goal: ', err))
};

addValues = (v, id) => {
  return Value.create({
    title: v.title,
    version: v.version,
    studentId: id
  })
  .then(newV => newV)
  .catch(err=>console.log('err adding goal: ', err))
};

addGoals = (g, id) => {
  return Goal.create({
    title: g.title,
    field: g.field || '',
    version: g.version,
    studentId: id
  })
  .then(newGoal => newGoal)
  .catch(err=>console.log('err adding goal: ', err))
}
