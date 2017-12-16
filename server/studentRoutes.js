const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const models = require('./db/models/core.js');
const overviewRoutes = require('./sectionRoutes/overviewRoutes.js');
const schoolRoutes = require('./sectionRoutes/schoolRoutes.js');
const activityRoutes = require('./sectionRoutes/activityRoutes.js');

const Student = models.Student;
const Teacher = models.Teacher;

const Enrollment = models.Enrollment;
const Op = models.Op;
const Participation = models.Participation;
const Org = models.Org;

const Goal = models.Goal;
const Value = models.Value;
const Personality = models.Personality;
const Subjects = models.Subjects;
const Leadership = models.Leadership;
const Strength = models.Strength;

router.post('/addOverview', overviewRoutes.addOverview)

router.get('/getOverview', overviewRoutes.getOverview)

router.post('/addSchool', schoolRoutes.addSchool)

router.get('/getSchool', schoolRoutes.getSchool)

router.post('/addActivities', activityRoutes.addActivities)

router.get('/getActivities', activityRoutes.getActivities)

router.get('/auth', (req, res) => {
  let name = req.query.name;
  let checkPassword = req.query.password;

  return Student.findOne({
    where: {name}
  })
  .then((student) => {
    if(student !== null) {
      let dbpw = student.dataValues.password;
      bcrypt.compare(checkPassword, dbpw)
      .then((check) => {
        if(check) {
          req.session.username = student.dataValues.name;
          req.session.role = 'student';
          res.send(student.dataValues);
        } else {
          res.send('incorrect password')
        }
      })
    } else {
      return bcrypt.hash(checkPassword, 5)
      .then((hash)=> {
        return Student.create({
          name,
          password: hash
        })
        .then((newStudent) => {
          req.session.username = newStudent.dataValues.name;
          req.session.role = 'student';
          res.send(newStudent.dataValues)
        })
      });
    }
  })
  .catch(err => console.log('error in student auth: ', err))
})

router.get('/test', (req, res) => {
  res.send('ok')
})

module.exports = router;
