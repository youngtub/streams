import React from 'react';
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {List, Button, Icon, Image, Popup} from 'semantic-ui-react';
import axios from 'axios';

import EditBP from './EditBP.jsx'

class BigPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: {},
      school: {},
      test: 0,
      showEdit: false,
      editing: {},
      section: ''
    }
  }

  componentDidMount() {
    this.refreshState()
  }

  refreshState = () => {
    var objForState = {};
    let paramsO = {section: 'overview', id: this.props.student.id}
    return axios.get('/api/student/getOverview', {params: paramsO})
    .then((res) => {
      // console.log('res from overview: ', res.data)
      objForState['overview'] = res.data;
      let paramsS = {section: 'school', id: this.props.student.id}
      return axios.get('/api/student/getSchool', {params: paramsS})
      .then((respo) => {
        // console.log('res from school: ', respo.data)
        objForState['school'] = respo.data;
        this.setState({
          overview: objForState.overview,
          school: objForState.school
        }, () => {
          console.log('state set in BP: ', this.state)
        })
      })
      .catch(err => console.log('err in fetch: ', err))
    })
    .catch(err => console.log('err in fetch: ', err))
  }

  add = (section) => {
    var toEdit = this.state[section];
    this.setState({
      editing: toEdit,
      section
    }, () => {
      this.setState({
        showEdit: true
      })
    })
  }

  toggleEdit = () => {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  editCb = (obj, section) => {
    this.setState({
      [section]: obj,
      showEdit: false
    }, () => {
      let id = this.props.student.id
      let body = {section, obj, id}
      let qs = {
        overview: 'addOverview',
        school: 'addSchool'
      }
      let q = '/api/student/' + qs[section];
      return axios.post(q, body)
      .then((res) => {
        console.log('res from student add sec: ', res)
        this.refreshState();
      })
    })
  }

  testChange = (test) => {
    let obj = {
      0: 'SAT',
      1: 'ACT'
    }
    this.setState({
      test,
      scores: dummyData.school[obj[test]]
    })
  }

  render() {
    return (
      <Grid fluid={true} className='bg'>
         <Row className='list'>
           <Col md={3}>
             <br/>
             <Image src='https://www.trybooking.com/media/2615/user-hero-blue.png' size='massive' />
           </Col>
           <Col md={1}></Col>
           <Col md={2}>
             <br/>
             <h3>Goals</h3>
             <List bulleted>
               {this.state.overview.goals ? this.state.overview.goals.map((goal, i) => (
                 <List.Item key={i}>{goal.title}</List.Item>
               )) : ''}
             </List>
           </Col>

           <Col md={2}>
             <br/>
             <h3>Values</h3>
             <List bulleted>
               {this.state.overview.values ? this.state.overview.values.map((val, i) => (
                 <List.Item key={i}>{val.title}</List.Item>
               )) : ''}
             </List>
           </Col>

           <Col md={2}>
             <br/>
             <h3>Personality</h3>
             <List bulleted>
               {this.state.overview.personality ? this.state.overview.personality.map((per, i) => (
                 <List.Item key={i}>{per.title}</List.Item>
               )): ''}
             </List>
           </Col>

           <Col md={2} className='center'>
             <br/><br/><br/>
             <Row>
               <Popup trigger={<Button icon='edit' onClick={() => this.add('overview')}/>}
                 content='Edit'
                 on='hover'
                 />
             </Row>
             <br/>
             <Row>
               <Popup trigger={<Button icon='ellipsis horizontal'/>}
                 content='Details'
                 on='hover'
                 />
             </Row>
             <br/>
             <Row>
               <Popup trigger={<Button icon='check'/>}
                 content='Check with Mentor'
                 on='hover'
                 />
             </Row>
             <br/>
           </Col>
         </Row>

         <hr/>

       <Row className='list'>
         <Col md={3}>
           <br/>
           <Image src='https://cdn2.iconfinder.com/data/icons/science-set-2/512/16-512.png' size='massive' />
         </Col>
         <Col md={1}></Col>
         <Col md={2}>
           <br/>
           <h3>Subjects</h3>
           <List bulleted>
             {this.state.school.subjects ? this.state.school.subjects.map((goal, i) => (
               <List.Item key={i}>{goal.title}</List.Item>
             )) : ''}
           </List>
         </Col>

         <Col md={2}>
           <br/>
           <h3>Leadership</h3>
           <List bulleted>
             {this.state.school.leadership ? this.state.school.leadership.map((val, i) => (
               <List.Item key={i}>{val.title}</List.Item>
             )):''}
           </List>
         </Col>

         <Col md={2}>
           <br/>
           <h3>Strengths</h3>
           <List bulleted>
             {this.state.school.strengths ? this.state.school.strengths.map((val, i) => (
               <List.Item key={i}>{val.title}</List.Item>
             )):''}
           </List>
         </Col>


         <Col md={2} className='center'>
           <br/><br/><br/>
           <Row>
             <Popup trigger={<Button icon='edit' onClick={() => this.add('school')}/>}
               content='Edit'
               on='hover'
               />
           </Row>
           <br/>
           <Row>
             <Popup trigger={<Button icon='ellipsis horizontal'/>}
               content='Details'
               on='hover'
               />
           </Row>
           <br/>
           <Row>
             <Popup trigger={<Button icon='check'/>}
               content='Check with Mentor'
               on='hover'
               />
           </Row>
           <br/>
         </Col>

       </Row>

     <EditBP showEdit={this.state.showEdit} toggleEdit={this.toggleEdit}
       editing={this.state.editing} section={this.state.section} editCb={this.editCb}/>
      </Grid>
    )
  }
};

const limits = {
  0: 2,
  1: 4
}

const dummyData = {
  overview: {
    goals: [
    {title: '', version: 0}
  ],
  values: [
    {title: '', version: 0}
  ],
  personality: [
    {title: '', version: 0}
  ]
},
school: {
  subjects: [
    {title: '', version: 0}
  ],
  leadership: [
    {title: '', version: 0}
  ],
  strengths: [
    {title: '', version: 0}
  ],
  scores: [
    [
      {section: 'Reading', score: '680'},
      {section: 'Math', score: '730'}
    ],
    [
      {section: 'Reading', score: '23'},
      {section: 'Math', score: '31'},
      {section: 'English', score: '23'},
      {section: 'Science', score: '31'}
    ]
  ]
}
}

export default BigPicture;
