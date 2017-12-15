const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const studentRoutes = require('./studentRoutes.js');
const teacherRoutes = require('./teacherRoutes.js')

router.use('/student', studentRoutes)

router.use('/teacher', teacherRoutes)

router.get('/test', (req, res) => {
  res.send('ok')
})

module.exports = router;
