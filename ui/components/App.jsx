import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import axios from 'axios';

//redux
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';
//router
import { Route, Switch, withRouter } from 'react-router-dom';

import Student from './Student.jsx';
import Messages from './Messages.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false
    }
  }

  componentWillReceiveProps(){
    setTimeout(()=> console.log('redux', this.props), 700)
  }

  toggleModal = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  login = (name, password) => {
    let params = {name, password}
    return axios.get('/api/student/auth', {params})
    .then((res) => {
      console.log('res from auth: ', res.data)
      this.props.actions.user({loggedIn: res.data})
    })
  }

  render() {
    return (
      <Grid fluid={true} className='bg'>

        <Row id='header'>
          <Header toggleModal={this.toggleModal} user={this.props.user}/>
        </Row>

        <hr/>


          {this.props.user.loggedIn ? (
            this.props.user.loggedIn.role === 'student' ? (
              <Row>
                <Col md={9}>
                  <Student student={this.props.user.loggedIn}/>
                </Col>

                <Col md={3}>
                  <Messages student={this.props.user.loggedIn}/>
                </Col>
              </Row>
            ) : (
              'teacher'
            )
          ):''}

        <br/>
        <Login showLogin={this.state.showLogin} toggleModal={this.toggleModal} login={this.login}/>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  test: state.test,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
