const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const models = require('./db/models/core.js');
const Student = models.Student;
const Teacher = models.Teacher;
const Enrollment = models.Enrollment;
const Goal = models.Goal;
const Op = models.Op;
const Participation = models.Participation;
const Org = models.Org;

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
