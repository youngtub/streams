import React from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';

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
                <BigPicture />
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

export default Student;
