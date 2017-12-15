import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';

import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';
import { Route, Switch, withRouter } from 'react-router-dom';

import BigPicture from './Dashboard/BigPicture.jsx';
import AHA from './Dashboard/AHA.jsx';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1
    }
  }

  handleChange = (tab) => {
    this.setState({tab})
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Tabs activeKey={this.state.tab} id='tabs' onSelect={this.handleChange}>
              <Tab eventKey={1} title="Big Picture">
                <BigPicture student={this.props.user.loggedIn}/>
              </Tab>
              <Tab eventKey={2} title="AHA Moments">
                <AHA />
              </Tab>
              <Tab eventKey={3} title="Application">
                apps
              </Tab>
          </Tabs>
        </Row>

      </Grid>
    )
  }

};

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
)(Student));
