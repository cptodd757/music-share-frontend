import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Song from '../Song/Song.js';

import './FriendIcon.css';

export default class FriendIcon extends Component {

  render() {
    return (
      <div className="friendicon">
        <div className="card">
            <div className="friend_username_class">
              {this.props.friend_username}
            </div>
          <Row>
            <Col id="received">
              <div className="friend-text">
                They've sent you:
              </div>
              {
                this.props.songsReceived.map(song =>
                  <Song info={song}>
                  </Song>
                  )
              }
            </Col>
            <Col id="sent">
              <div className="friend-text">
                You've sent them:
              </div>
              {
                this.props.songsSent.map(song =>
                  <Song info={song}>
                  </Song>
                  )
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
