import React from 'react';
import {Grid, Row, Col, Modal, FormGroup, FormControl,
  ControlLabel, Carousel, ToggleButtonGroup, ToggleButton,
  DropdownButton, MenuItem } from 'react-bootstrap';
import {Button, Icon, Image, Input, List, Form} from 'semantic-ui-react';
import capitalize from 'capitalize';
// import Carousel from 'nuka-carousel'

class EditAHAAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: [],
      activeIndex: 0,
      direction: null
    }
  }

  componentDidMount() {
    console.log('props: ', this.props)
    this.setState({
      edit: this.props.editing
    }, () => {
      console.log('state in edit', this.state)
    })
  }

  handleChange = (val, i, key) => {
    var old = this.state.edit;
    old[i][key] = val;
    this.setState({
      edit: old
    }, () => {
      console.log('type: ', this.state.edit[i][key])
    })
  };

  carouselChange = (activeIndex, e) => {
    this.setState({
      activeIndex, direction: e.direction
    })
  }

  addActivity = () => {
    var oldEdit = this.state.edit.slice();
    let newInd = oldEdit.length;
    let newBlank = {id: 'notyet', title: `Activity ${newInd}`, description: '...', date: '...', reference: '...', location: '...', ongoing: '', type: ''}
    oldEdit.push(newBlank);
    this.setState({
      edit: oldEdit,
      activeIndex: newInd
    })
  }

  submit = () => {
    this.props.editingMainActivities ? (
      this.props.editMainActivities(this.state.edit)
    ) : (
      this.props.editCb(this.state.edit, 'additional')
    )
  }

  render() {
    return (
      <Modal show={this.props.showEdit} onHide={this.props.closeEdit} style={editStyle} bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Carousel activeIndex={this.state.activeIndex} direction={this.state.direction} onSelect={this.carouselChange}>
              {this.state.edit.map((obj, i) => (
                <Carousel.Item key={i}>
                <Form>
                    <Col md={4}></Col>
                    <Col md={4}>
                    {Object.keys(obj).slice(1, 6).map((key, j) => (
                      <Row key={j}>
                        <FormGroup controlId={`${j}`}>
                          <ControlLabel>{capitalize(key)}</ControlLabel>
                          <FormControl type='text' value={this.state.edit[i][key]}
                            onChange={(e) => this.handleChange(e.target.value, i, key)}/>
                        </FormGroup>
                        <br/>
                      </Row>
                    ))}
                    <Row>
                      <FormGroup controlId={'5'}>
                        <ControlLabel>Involvement</ControlLabel><br/>
                        <ToggleButtonGroup type='radio' name='inv' value={this.state.edit[i].involvement}
                          onChange={(value) => this.handleChange(value, i, 'involvement')}>
                          <ToggleButton value={'single'}>Single</ToggleButton>
                          <ToggleButton value={'ongoing'}>Ongoing</ToggleButton>
                        </ToggleButtonGroup>
                      </FormGroup>
                      <br/>
                    </Row>
                    <Row>
                      <FormGroup controlId={'6'}>
                        <ControlLabel>Type</ControlLabel><br/>
                          <DropdownButton id='type' title={capitalize(this.state.edit[i].type || "Select...")}
                            onSelect={(key) => this.handleChange(key, i, 'type')}
                            >
                            <MenuItem eventKey="competition">Competition</MenuItem>
                            <MenuItem eventKey="service">Service</MenuItem>
                            <MenuItem eventKey="creative">Creative</MenuItem>
                          </DropdownButton>
                      </FormGroup>
                      {!this.props.editingMainActivities ? <FormGroup controlId={'6'}>
                        <ControlLabel>Main</ControlLabel><br/>
                          <DropdownButton id='main' title={capitalize(this.state.edit[i].main || "Select...")}
                            onSelect={(key) => this.handleChange(key, i, 'main')}
                            >
                            {this.props.mains.map((main, i) => (
                              <MenuItem eventKey={`${main.id}`} key={i}>{main.title}</MenuItem>
                            ))}
                          </DropdownButton>
                      </FormGroup> : ''}
                    </Row>
                    <br/><br/><br/><br/><br/>
                  </Col>
                  <Col md={4}></Col>
                </Form>
                <br/><br/>
                <br/><br/><br/><br/>
              </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button icon='plus' onClick={this.addActivity} />
          <Button onClick={this.props.closeEdit}>Cancel</Button>
          <Button primary onClick={()=>this.submit()}>Done</Button>
        </Modal.Footer>
      </Modal>
    )
  }
};

const editStyle = {
  padding: '10px'
}

export default EditAHAAdd;
