import React from 'react';
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton, Accordion, Panel} from 'react-bootstrap';
import {List, Button, Icon, Image, Popup, Item} from 'semantic-ui-react';

import EditAHAPrimary from './EditAHAPrimary.jsx';
import EditAHAAdd from './EditAHAAdd.jsx';

class AHA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additional: [],
      mains: [],
      showEditP: false,
      showEditA: false,
      editing: []
    }
  }

  componentWillMount() {
    this.setState({
      mains: mains,
      additional: da
    }, () => {
      // console.log('state in aha: ', this.state)
    })
  }

  openEdit = (val) => {
    var editing; val === 0 ? editing = this.state.mains : editing = this.state.additional;
    var showEditP; val === 0 ? showEditP = true : showEditP = false;
    this.setState({editing}, () => {
      this.setState({showEditP, showEditA: !showEditP})
    })
  }

  closeEdit = () => {
    this.setState({showEditP: false, showEditA: false})
  }

  editCb = (arr, section) => {
    this.setState({
      [section]: arr
    }, () => {
      this.closeEdit()
      // let id = this.props.student.id
      // let body = {section, obj, id}
      // let qs = {
      //   overview: 'addOverview',
      //   school: 'addSchool'
      // }
      // let q = '/api/student/' + qs[section];
      // return axios.post(q, body)
      // .then((res) => {
      //   console.log('res from student add sec: ', res)
      // })
    })
  }

  render() {
    return (
      <Grid fluid={true} className='bg'>
        <br/><br/>
        <Row className='lists'>
          <Col md={1}></Col>
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
                  </Col>
                </Row>
                <br/>
                <Accordion>
                  {main.activities.map((act, j) => (
                    <Panel header={act.title} collapsible={true} eventKey={`${i}${j}`} key={j}>
                      {act.description}
                      <hr/>
                      {act.date} - {act.reference}
                    </Panel>
                  ))}
                  <br/>
                </Accordion>
              </Row>
            ))}
            <Row className='center'>
              <Button icon='edit' size='small' onClick={()=>this.openEdit(0)}/>
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
                <Item style={actStyle}>
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
              <Button icon='plus' size='small' onClick={()=>this.openEdit(1)}/>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>
        <br/><br/>
        {this.state.showEditP ? <EditAHAPrimary showEdit={this.state.showEditP} editing={this.state.editing}
          closeEdit={this.closeEdit} editCb={this.editCb} /> : ''}
        {this.state.showEditA ? <EditAHAAdd showEdit={this.state.showEditA} editing={this.state.editing}
          closeEdit={this.closeEdit} editCb={this.editCb} /> : ''}
      </Grid>
    )
  }
};

const mains = [
  {
    title: 'Research',
    activities: [
      {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
      {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
      {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
    ],
  },
  {
    title: 'Soccer',
    activities: [
      {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
      {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
      {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
    ],
  }
]

const da = [
  {title: 'Activity 1', description: '...', date: 'date', reference: 'teacher'},
  {title: 'Activity 2', description: '...', date: 'date', reference: 'teacher'},
  {title: 'Activity 3', description: '...', date: 'date', reference: 'teacher'}
];

const actStyle = {
  border: 'solid black 1px',
  borderRadius: '10px',
  padding: '7px'
}

export default AHA;
