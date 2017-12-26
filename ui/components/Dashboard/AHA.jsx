import React from 'react';
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton, Accordion, Panel} from 'react-bootstrap';
import {List, Button, Icon, Image, Popup, Item} from 'semantic-ui-react';
import axios from 'axios';

import EditAHAPrimary from './EditAHAPrimary.jsx';
import EditAHAAdd from './EditAHAAdd.jsx';
import EditAHAMain from './EditAHAMain.jsx';

class AHA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additional: [],
      mains: [],
      showEditP: false,
      showEditA: false,
      editing: [],
      editingMainActivities: false,
      editingMain: {},
      editingMainInd: -1
    }
  }

  componentWillMount() {
    this.refreshState();
  }

  refreshState = () => {
    let id = this.props.student.id;
    let params = {id}
    return axios.get('/api/student/getAllActivities', {params})
    .then((acts) => {
      console.log('all acts: ', acts.data);
      return axios.get('/api/student/getMains', {params})
      .then((mains) => {
        console.log('all mains: ', mains.data);
        this.setState({
          mains: mains.data,
          additional: acts.data
        }, () => {
          // console.log('state in aha: ', this.state)
        })
      })
    })
  }

  openEdit = (val, main, i) => {
    var editing; val === 0 ? editing = this.state.mains : editing = this.state.additional;
    var editingMainActivities = false;
    var editingMain = {};
    var editingMainInd = -1;
    if(main) {
      var actsToEdit = this.state.mains[i].activities
      console.log('to edit: ', actsToEdit)
      editing = actsToEdit;
      editingMainActivities = true;
      editingMain = main;
      editingMainInd = i;
    }
    var showEditP; val === 0 ? showEditP = true : showEditP = false;
    this.setState({editing}, () => {
      this.setState({showEditP, showEditA: !showEditP, editingMainActivities, editingMain, editingMainInd})
    })
  }

  closeEdit = () => {
    this.setState({showEditP: false, showEditA: false})
  }

  editMainActivities = (arr) => {
    var allMains = this.state.mains.slice();
    var newMain = allMains[this.state.editingMainInd];
    arr.forEach(act => act['main'] = this.state.editingMain.id)
    newMain.activities = arr;
    allMains.splice(this.state.editingMainInd, 1, newMain)
    this.setState({
      mains: allMains,
      editingMainActivities: false,
      editingMain: {},
      editingMainInd: -1,
      showEditA: false,
      showEditP: false
    }, () => {
      return Promise.all(arr.map(this.saveActivityToDb))
      .then((res) => {
        console.log('items saved to db: ', res);
        this.refreshState()
      })
    })
  }

  editCb = (arr, section) => {
    this.setState({
      [section]: arr
    }, () => {
      this.closeEdit()
      var newArr = this.state[section].slice()
      if(section === 'additional') {
        return Promise.all(newArr.map(this.saveActivityToDb))
        .then((res) => {
          console.log('items saved to db: ', res);
          this.refreshState()
        })
      } else {
        return Promise.all(newArr.map(this.saveMainToDb))
        .then((res) => {
          console.log('items saved to db: ', res);
          this.refreshState()
        })
      }
    })
  }

  saveActivityToDb = (item) => {
    var studentId = this.props.student.id
    var body = {
      id: studentId, title: item.title, date: item.date, description: item.description,
      reference: item.reference, location: item.location,
      involvement: item.involvement, type: item.type, mainId: +item.main
    }
    return axios.post('/api/student/addActivity', body)
    .then((res) => {
      console.log('res from adding activity: ', res.data)
    })
  };

  saveMainToDb = (item) => {
    var studentId = this.props.student.id
    var body = {
      id: studentId, title: item.title
    }
    return axios.post('/api/student/addMain', body)
    .then((res) => {
      console.log('res from adding Main: ', res.data)
    })
  }

  render() {
    return (
      <Grid fluid={true} className='bg'>
        <br/><br/>
        <Row className='lists'>
          <Col md={6}>
            <h3 className='center'>Primary</h3>
            <hr/>
            {this.state.mains.map((main, i) => (
              <Row key={main.title}>
                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <h4 className='center'>{main.title}</h4>
                  </Col>
                  <Col md={4} className='right'>
                    <Button icon='edit' size='small' onClick={()=>this.openEdit(1, main, i)}/>
                  </Col>
                </Row>
                <br/>
                <Accordion>
                  {main.activities ? main.activities.map((act, j) => (
                    <Panel header={act.title} collapsible={'true'} eventKey={`${i}${j}`} key={j}>
                      {act.description}
                      <hr/>
                      {act.date} - {act.reference}
                    </Panel>
                  )) : ''}
                  <br/>
                </Accordion>
              </Row>
            ))}
            <Row className='center'>
              <Button icon='plus' size='small' onClick={()=>this.openEdit(0, i)}/>
            </Row>
            {this.state.mains.length < 3 ? (
              <Row className='center'>
                <hr/>
                You are {3 - this.state.mains.length} {this.state.mains.length === 1 ? 'activities' : 'activity'} short!
                Click <Button icon='plus' size='mini'/> to add
              </Row>
            ) : ''}
          </Col>
          <Col md={1}></Col>
          <Col md={3}>
            <Row>
              <h3 className='center'>Additional</h3>
            </Row>
            <hr/>
            <Item.Group>
              {this.state.additional.map((item, i) => (
                <Item style={actStyle} key={i}>
                  <Item.Image size='tiny' src='http://venicebeachcotel.com/wp-content/uploads/2011/03/activity-icon.png' />

                  <Item.Content>
                    <Item.Header as='a'>{item.title}</Item.Header>
                    <Item.Meta>{item.date}</Item.Meta>
                    <Item.Description>
                      {item.description}
                    </Item.Description>
                    <Item.Extra>{item.reference}</Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
            <Row className='center'>
              <Button icon='edit' size='small' onClick={()=>this.openEdit(1)}/>
            </Row>
          </Col>
          <Col md={2}>
            <Button content='Add Activity' icon='plus' onClick={()=>this.openEdit(1, 'add')} />
          </Col>
        </Row>
        <br/><br/>
        {this.state.showEditP ? <EditAHAMain showEdit={this.state.showEditP} editing={this.state.editing} mains={this.state.mains}
          closeEdit={this.closeEdit} editCb={this.editCb} /> : ''}
        {this.state.showEditA ? <EditAHAAdd showEdit={this.state.showEditA} editing={this.state.editing} mains={this.state.mains}
          closeEdit={this.closeEdit} editCb={this.editCb}
          editingMainActivities={this.state.editingMainActivities} editMainActivities={this.editMainActivities}/> : ''}
      </Grid>
    )
  }
};

const mains = [
  // {
  //   title: 'Research',
  //   activities: [
  //     {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
  //     {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
  //     {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
  //   ],
  // },
  // {
  //   title: 'Soccer',
  //   activities: [
  //     {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
  //     {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
  //     {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
  //   ],
  // }
]

const da = [
  // {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
  // {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
  // {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
];

const actStyle = {
  border: 'solid black 1px',
  borderRadius: '10px',
  padding: '7px'
}

export default AHA;
