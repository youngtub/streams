import React from 'react';
import {Grid, Row, Col, Modal, FormGroup, FormControl} from 'react-bootstrap';
import {Button, Icon, Image, Input, List, Form} from 'semantic-ui-react';

class EditBP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: {}
    }
  }

  componentWillReceiveProps() {
    // console.log('props: ', this.props)
    this.setState({
      edit: this.props.editing
    }, () => {
      // console.log('state in edit', this.state)
    })
  }

  handleChange = (val, key, i) => {
    var old = this.state.edit;
    old[key][i] = val;
    this.setState({
      edit: old
    }, () => {
      // console.log('test: ', this.state.edit[key][i])
    })
  };

  addField = (key) => {
    var old = this.state.edit;
    old[key].push('');
    this.setState({
      edit: old
    })
  }

  submit = () => {
    this.props.editCb(this.state.edit, this.props.section)
  }

  render() {
    return (
      <Modal show={this.props.showEdit} onHide={this.props.toggleEdit} style={editStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              {Object.keys(this.state.edit).filter(key => key !=='scores').map((key, i) => (
                <Col md={4}>
                <Row> {key.slice(0, 1).toUpperCase() + key.slice(1)} </Row>
                  {this.state.edit[key].map((item, i) => (
                    <Row>
                      <FormControl type='text' value={this.state.edit[key][i]}
                        onChange={(e) => this.handleChange(e.target.value, key, i)}/>
                      <br/>
                    </Row>
                  ))}
                  <Button icon='plus' onClick={() => this.addField(key)} />
              </Col>
              ))}
            </Form>
            <hr/>
            <Row className='center'>
              <Button onClick={this.props.toggleEdit}>Cancel</Button>
              <Button primary onClick={()=>this.submit()}>Done</Button>
            </Row>
          </Row>
        </Modal.Body>
      </Modal>
    )
  }
};

const editStyle = {
  padding: '10px'
}

export default EditBP;
