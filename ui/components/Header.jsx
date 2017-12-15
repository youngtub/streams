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
      </Col>
      <Col md={7}></Col>
      <Col md={2} className='right'>
        <br/><br/>
        <Button onClick={props.toggleModal}>Log in/Sign up</Button>
      </Col>
    </Grid>
  )
};

const imgStyle = {
  height: '15vh'
  // width: '3vw'
}

export default Header;
