import React from 'react';
import {Grid, Row, Col, Modal, FormGroup, FormControl,
  ControlLabel, Carousel, ToggleButtonGroup, ToggleButton,
  DropdownButton, MenuItem } from 'react-bootstrap';
import {Button, Icon, Image, Input, List, Form} from 'semantic-ui-react';
import capitalize from 'capitalize';
// import Carousel from 'nuka-carousel'

class EditAHAMain extends React.Component {
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

  handleChange = (val, i) => {
    var old = this.state.edit;
    old[i].title = val;
    this.setState({
      edit: old
    }, () => {
      console.log('main: ', this.state.edit[i])
    })
  };

  addMain = () => {
    var oldEdit = this.state.edit.slice();
    let newInd = oldEdit.length;
    let newBlank = {title: `Main ${newInd}`}
    oldEdit.push(newBlank);
    this.setState({
      edit: oldEdit,
    })
  }

  submit = () => {
    this.props.editCb(this.state.edit, 'mains')
  }

  render() {
    return (
      <Modal show={this.props.showEdit} onHide={this.props.closeEdit} style={editStyle} bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>Add Main</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Form>
              {this.state.edit.map((obj, i) => (
                <Row>
                  <FormGroup controlId={1}>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl type='text' value={this.state.edit[i].title}
                      onChange={(e) => this.handleChange(e.target.value, i)}/>
                  </FormGroup>
                  <br/>
                </Row>
              ))}
            </Form>
            </Col>
              <Col md={4}></Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button icon='plus' onClick={this.addMain} />
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

export default EditAHAMain;
