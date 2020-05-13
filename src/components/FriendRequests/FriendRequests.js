import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import './FriendRequests.css';

export default class FriendRequests extends Component 
{
  constructor()
  {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
  }

  acceptRequest(event)
  {
    let submit_url = 'http://localhost:4000/api/accept_friend_request';
    fetch(submit_url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      body: JSON.stringify({"friend_username":event.target.id})
    })
    .then(response => {return response.json()})
    .then(response =>
      {
        console.log(response);
      })
  }

  componentDidMount()
  {
    console.log('friend request props:');
    console.log(this.props);
  }
  render() {
    return (
      <div className="friendrequest">
        <div className="card">
          <div className="friend-request-text">
            Friend Requests:
          </div>  
          {
            this.props.friend_requests.map(friend =>
              <div className="friend_request_class">
                
                <div className="friend-username-text">
                  <Row>
                    <Col xs="7">
                      {friend}
                    </Col>
                    <Col xs="3">
                      <Button outline id={friend} onClick={this.acceptRequest} size="sm">
                        Accept!
                      </Button>

                    </Col>
                  </Row>
                </div>
                
                
              
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
