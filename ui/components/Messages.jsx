import React from 'react';
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {List, Button, Icon, Image, Popup, Comment, Form, Header } from 'semantic-ui-react';
import dateformat from 'dateformat';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      reply: ''
    }
  }

  componentWillMount() {
    this.setState({
      messages: dummy
    })
  }

  handleChange = (e) => {
    this.setState({
      reply: e.target.value
    })
  }

  submit = () => {
    let newMsgObj = {from: 'student', text: this.state.reply, timestamp: (new Date()).toString()}
    let newMessages = this.state.messages.slice();
    newMessages.push(newMsgObj);
    this.setState({
      reply: '',
      messages: newMessages
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <h3 className='center'>Messages</h3>
        <hr/>
        <Comment.Group>
          {this.state.messages.map((msg, i) => (
            <Comment>
              <Comment.Avatar src={avatars[msg.from]} />
              <Comment.Content>
                <Comment.Author as='a'>{msg.from}</Comment.Author>
                <Comment.Metadata>
                  {dateformat(msg.timestamp, "mmmm dS, h:MM TT")}
                </Comment.Metadata>
                <Comment.Text>{msg.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <Form reply>
                <Form.TextArea style={replyStyle} onChange={this.handleChange} value={this.state.reply}/>
                <Button content='Reply' labelPosition='left' icon='edit' primary onClick={this.submit}/>
          </Form>
        </Comment.Group>
      </Grid>
    )
  }
};

const replyStyle = {
  maxHeight: '7vh',
  overflowY: 'scroll'
}

const avatars = {
  student: 'https://image.flaticon.com/icons/svg/201/201818.svg',
  teacher: 'https://us.123rf.com/450wm/fouaddesigns/fouaddesigns1604/fouaddesigns160400058/55106123-illustration-of-graduate-and-teacher-icon-isolated-on-white.jpg?ver=6'
}

const dummy = [
  {from: 'teacher', text:'do your homework', timestamp: '2017-12-13T18:50:09.368Z'},
  {from: 'student', text:'ok miss', timestamp: '2017-12-13T19:10:09.368Z'},
  {from: 'teacher', text:'done?', timestamp: '2017-12-13T19:50:09.368Z'},
  {from: 'student', text:'no miss', timestamp: '2017-12-13T19:55:09.368Z'},
  {from: 'teacher', text:'Ok let me know when', timestamp: '2017-12-13T20:10:09.368Z'},
]

export default Messages;
