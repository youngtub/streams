import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Button, Icon, Image} from 'semantic-ui-react';


const Header = (props) => {

  return (
    <Grid fluid={true}>
      <Col md={1}>
        <img src='https://docs.google.com/uc?id=1NDIII1-UKXJj2wiXg0vtJFP1Ex_4Zpho' style={imgStyle}/>
      </Col>
      <Col md={2}>
        <br/>
        <h1 className='mont'>StreamsCC</h1>
        <img src='https://drive.google.com/uc?id=19VpLeosjQxzJytp9OH28a_4DgfWBpwqw' style={betaStyle} />
      </Col>
      <Col md={1}>
      </Col>
      <Col md={4}></Col>
      <Col md={4} className='right'>
        <br/><br/>
        {props.user.loggedIn ? (
          props.user.loggedIn.role === 'student' ? (
            <Row>
              <Button>Account</Button>
              <Button>Backpack</Button>
              <Button>Logout</Button>
            </Row>
          ) : (
            <Row>
              <Button>Account</Button>
              <Button>Classroom</Button>
              <Button>Logout</Button>
            </Row>
          )
        ) : (
          <Button onClick={props.toggleModal}>Log in/Sign up</Button>
        )}
      </Col>
    </Grid>
  )
};

const betaStyle = {
  height: '7vh'
}

const imgStyle = {
  height: '15vh'
  // width: '3vw'
}

export default Header;
