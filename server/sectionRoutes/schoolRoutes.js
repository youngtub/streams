const models = require('../db/models/core.js');
// const Goal = models.Goal;
// const Value = models.Value;
// const Personality = models.Personality;
const Subject = models.Subject;
const Leadership = models.Leadership;
const Strength = models.Strength;

// GET

exports.getSchool = (req, res) => {
  let section = req.query.section;
  let id = req.query.id;
  let version = req.query.version || null;
  return gatherSchool(id, version)
  .then((dbentries) => {
    // console.log('db entries obj: ', dbentries)
    res.send(dbentries)
  })
  .catch(err => console.log('err in db entries: ', err))
};

gatherSchool = (studentId, version) => {
  var output = {};
  return getSubjects(studentId, version)
  .then((subjects) => {
    output['subjects'] = subjects;
    return getLeaderships(studentId, version)
    .then((leadership) => {
      output['leadership'] = leadership;
      return getStrengths(studentId, version)
      .then((strengths) => {
        output['strengths'] = strengths;
        return output;
      })
    })
  })
};

getSubjects = (studentId, version) => {
  if(version === null) {
    return Subject.findAll({
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
      // console.log('curr Ps', currPs)
      return currPs;
    })
  } else {
    return Subject.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

getLeaderships = (studentId, version) => {
  if(version === null) {
    return Leadership.findAll({
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
      // console.log('curr Ps', currPs)
      return currPs;
    })
  } else {
    return Leadership.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

getStrengths = (studentId, version) => {
  if(version === null) {
    return Strength.findAll({
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
      // console.log('curr Ps', currPs)
      return currPs;
    })
  } else {
    return Strength.findAll({
      where: {studentId, version}
    })
    .then((persV) => persV)
  }
};

// ADD

exports.addSchool = (req, res) => {
  let section = req.body.section;
  let obj = req.body.obj;
  let id = req.body.id;
  return createSchool(obj, id)
  .then((dbentries) => {
    // console.log('db entries obj: ', dbentries)
    res.send(dbentries)
  })
  .catch(err => console.log('err in db entries: ', err))
}

createSchool = (obj, id) => {
  // console.log('in add overview')
  var output = {};
  return Promise.all(obj.subjects.map(g => addSubjects(g, id)))
  .then((subjs) => {
    output['subjects'] = subjs
    return Promise.all(obj.leadership.map(v=>addLeadership(v, id)))
    .then((lead) => {
      output['leadership'] = lead;
      return Promise.all(obj.strengths.map(p=>addStrengths(p, id)))
      .then((str) => {
        output['strengths'] = str;
        return output
      })
      .catch(err=>console.log('err adding sec: ', err))
    })
    .catch(err=>console.log('err adding sec: ', err))
  })
  .catch(err=>console.log('err adding sec: ', err))
};

addSubjects = (p, id) => {
  return Subject.create({
    title: p.title,
    level: p.level || '',
    version: p.version,
    studentId: id
  })
  .then(newP => newP)
  .catch(err=>console.log('err adding goal: ', err))
};

addLeadership = (v, id) => {
  return Leadership.create({
    title: v.title,
    role: v.role || '',
    version: v.version,
    studentId: id
  })
  .then(newV => newV)
  .catch(err=>console.log('err adding goal: ', err))
};

addStrengths = (g, id) => {
  return Strength.create({
    title: g.title,
    reason: g.reason || '',
    version: g.version,
    studentId: id
  })
  .then(newGoal => newGoal)
  .catch(err=>console.log('err adding goal: ', err))
}
