import React from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import {Button, Icon, Image, Input} from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: ''
    }
  }

  handleChange = (text, prop) => {
    this.setState({
      [prop]: text
    })
  }

  submit = () => {
    let name = this.state.username;
    let password = this.state.password;
    if(this.state.code === '009') {
      this.props.login(name, password)
      this.props.toggleModal()
    }
  }

  render() {
    return (
      <Modal show={this.props.showLogin} onHide={this.props.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log in/Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={2}>
              Username:
            </Col>
            <Col md={4}>
              <Input onChange={(e) => this.handleChange(e.target.value, 'username')} value={this.state.username}/>
            </Col>
          </Row>

          <br/>

          <Row>
            <Col md={2}>
              Password:
            </Col>
            <Col md={4}>
              <Input type='password' onChange={(e) => this.handleChange(e.target.value, 'password')} value={this.state.password}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={2}>
              Teacher Code:
            </Col>
            <Col md={4}>
              <Input onChange={(e) => this.handleChange(e.target.value, 'code')} value={this.state.code}/>
            </Col>
          </Row>

          <br/>

          <Row>
            <Col md={2}></Col>
            <Col md={6}>
              <Button onClick={this.submit}>Sign up</Button>
              <Button primary onClick={this.submit}>Log in</Button>
            </Col>
          </Row>

        </Modal.Body>
      </Modal>
    )
  }
};

export default Login;
