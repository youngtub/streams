const express = require('express');
const router = require('express').Router();
const axios = require('axios');

const models = require('./db/models/core.js');
const Student = models.Student;
const Teacher = models.Teacher;
const Enrollment = models.Enrollment;
const Goal = models.Goal;
const Op = models.Op;
const Participation = models.Participation;
const Org = models.Org;

router.get('/test', (req, res) => {
  res.send('ok')
})

module.exports = router;
