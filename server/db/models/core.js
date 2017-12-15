const Sequelize = require('sequelize');
const db = require('../../db').streams;

const Student = db.define('student', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  gender: Sequelize.STRING,
  grade: Sequelize.INTEGER,
  age: Sequelize.INTEGER,
  school: Sequelize.STRING,
  location: Sequelize.STRING,
  role: {type: Sequelize.STRING, defaultValue: 'student'}
});

Student.sync({force: false});

//Teachers

const Teacher = db.define('teacher', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  gender: Sequelize.STRING,
  location: Sequelize.STRING,
  role: {type: Sequelize.STRING, default: 'teacher'}
});

Teacher.sync({force: false});

// enrollment

const Enrollment = db.define('teacher', {
  status: Sequelize.STRING
});

Enrollment.belongsTo(Student, {through: 'studentId'})
Enrollment.belongsTo(Teacher, {through: 'teacherId'})

Enrollment.sync({force: false});

//Goals

const Goal = db.define('goal', {
  title:  Sequelize.STRING,
  field: Sequelize.STRING
});

Goal.belongsTo(Student, {through: 'studentId'})

Goal.sync({force: false});

// Orgs

const Org = db.define('org', {
  title:  Sequelize.STRING,
  field: Sequelize.STRING,
  website: Sequelize.STRING
});

Org.sync({force: false});

// Ops

const Op = db.define('op', {
  title:  Sequelize.STRING,
  type: Sequelize.STRING,
  location: Sequelize.STRING,
  ongoing: Sequelize.BOOLEAN
});

Op.belongsTo(Org, {through: 'orgId'})

Op.sync({force: false});

// participation

const Participation = db.define('participation', {
  status:  Sequelize.STRING,
});

Participation.belongsTo(Op, {through: 'opId'})
Participation.belongsTo(Student, {through: 'studentId'})

Participation.sync({force: false});

// enrollment

module.exports = {Student, Teacher, Enrollment, Goal, Org, Op, Participation};
