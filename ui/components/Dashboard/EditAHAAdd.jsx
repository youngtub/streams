import React from 'react';
import {Grid, Row, Col, Modal, FormGroup, FormControl} from 'react-bootstrap';
import {Button, Icon, Image, Input, List, Form} from 'semantic-ui-react';
import Carousel from 'nuka-carousel'

class EditAHAAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: []
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
      // console.log('test: ', this.state.edit[key][i])
    })
  };

  addActivity = () => {
    var oldEdit = this.state.edit.slice();
    let newBlank = {title: '', description: '', date: '', reference: ''}
    oldEdit.push(newBlank);
    this.setState({
      edit: oldEdit
    })
  }

  submit = () => {
    this.props.editCb(this.state.edit, 'additional')
  }

  render() {
    return (
      <Modal show={this.props.showEdit} onHide={this.props.closeEdit} style={editStyle} bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Carousel>
              {this.state.edit.map((obj, i) => (
                <div>
                <Form>
                    <Col md={4}></Col>
                    <Col md={4}>
                    {Object.keys(obj).map((key, j) => (
                      <Row>
                        <FormControl type='text' value={this.state.edit[i][key]}
                          onChange={(e) => this.handleChange(e.target.value, i, key)}/>
                        <br/>
                      </Row>
                    ))}
                  </Col>
                  <Col md={4}></Col>
                </Form>
                <br/><br/><br/><br/>
              </div>
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
