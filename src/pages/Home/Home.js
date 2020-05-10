import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Menu from '../../components/Menu/Menu.js';
import FriendIcon from '../../components/FriendIcon/FriendIcon.js';

export default class Home extends Component 
{
  constructor()
  {
    super();
    this.state = {"friends":[]}
  }

  componentDidMount()
  {
    let submit_url = 'http://localhost:4000/api/get_friends';
    fetch(submit_url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      }
    })
    .then(response =>
    {
      console.log(response);
      return response.json();
    })
    .then(response => 
    {
      this.setState({friends:response.friends});
      console.log(this.state);
    })
  }

  render() 
  {
    return (
      <div className="home">
        <Row>
          <Col xs="3">
            <Menu username={localStorage.getItem("username")}/>
          </Col>
          <Col xs="9">
          {
            this.state.friends.map(friend =>
            <FriendIcon friend_username={friend.username} songsReceived={friend.songsReceived} songsSent={friend.songsSent}>
            </FriendIcon>
            )
          }
          </Col>
        </Row>
      </div>
    )
  }
}
