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
  field: Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Goal.belongsTo(Student, {through: 'studentId'})

Goal.sync({force: false});

//values

const Value = db.define('value', {
  title:  Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Value.belongsTo(Student, {through: 'studentId'})

Value.sync({force: false});

//values

const Personality = db.define('personality', {
  title:  Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Personality.belongsTo(Student, {through: 'studentId'})

Personality.sync({force: false});

// Subjects

const Subject = db.define('subject', {
  title: Sequelize.STRING,
  level: Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Subject.belongsTo(Student, {through: 'studentId'})

Subject.sync({force: false});

// Leadership

const Leadership = db.define('leadership', {
  title: Sequelize.STRING,
  role: Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Leadership.belongsTo(Student, {through: 'studentId'})

Leadership.sync({force: false});

// Strengths

const Strength = db.define('strength', {
  title: Sequelize.STRING,
  reason: Sequelize.STRING,
  version: {type: Sequelize.INTEGER, defaultValue: 0}
});

Strength.belongsTo(Student, {through: 'studentId'})

Strength.sync({force: false});

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

module.exports = {
  Student, Teacher, Enrollment,
  Goal, Value, Personality,
  Subject, Leadership, Strength,
  Org, Op, Participation
};
