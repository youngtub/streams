import React from 'react';
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {List, Button, Icon, Image, Popup} from 'semantic-ui-react';

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

  componentWillMount() {
    this.setState({
      overview: [''],
      school: ['']
    }, () => {
      // console.log('state in big picture: ', this.state)
    })
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
             <h3>Career Goals</h3>
             <List bulleted>
               {this.state.overview.goals ? this.state.overview.goals.map((goal, i) => (
                 <List.Item key={i}>{goal}</List.Item>
               )) : ''}
             </List>
           </Col>

           <Col md={2}>
             <br/>
             <h3>Core Values</h3>
             <List bulleted>
               {this.state.overview.values ? this.state.overview.values.map((val, i) => (
                 <List.Item key={i}>{val}</List.Item>
               )) : ''}
             </List>
           </Col>

           <Col md={2}>
             <br/>
             <h3>Personality</h3>
             <List bulleted>
               {this.state.overview.personality ? this.state.overview.personality.map((per, i) => (
                 <List.Item key={i}>{per}</List.Item>
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
               <List.Item key={i}>{goal}</List.Item>
             )) : ''}
           </List>
         </Col>

         <Col md={2}>
           <br/>
           <h3>Leadership</h3>
           <List bulleted>
             {this.state.school.leadership ? this.state.school.leadership.map((val, i) => (
               <List.Item key={i}>{val}</List.Item>
             )):''}
           </List>
         </Col>

         <Col md={2}>
           <br/>
           <h3>Scores</h3>
             <ToggleButtonGroup
                     type="radio"
                     name='scores'
                     value={this.state.test}
                     onChange={this.testChange}
                     className='center'
                   >
                <ToggleButton value={0}>SAT</ToggleButton>
                <ToggleButton value={1}>ACT</ToggleButton>
              </ToggleButtonGroup>
           {/*<List bulleted>
             {this.state.school.scores[this.state.test].map((score, i) => (
               <List.Item key={i}>{score.section + ': ' + score.score}</List.Item>
             ))}
             {this.state.school.scores[this.state.test].length < limits[this.state.test] ? (
               <Button icon='edit' onClick={this.add}/>
             ) : ''}
           </List>*/}
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
    'MD-PDH',
    'Surgeon',
    'Cancer Doctor'
  ],
  values: [
    'Mental and Physical Well-Being',
    'Accessiblity'
  ],
  personality: [
    'Soft spoken',
    'Friendly',
    'Caring'
  ]
},
school: {
  subjects: [
    'Biology - HL',
    'Chemistry - HL',
    'Math - HL',
    'English - SL',
    'Spanish - SL',
    'Economics - SL'
  ],
  leadership: [
    'Relay for Life (Organizer)'
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
