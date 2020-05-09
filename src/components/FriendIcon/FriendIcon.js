import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Song from '../Song/Song.js';

export default class FriendIcon extends Component {

  render() {
    return (
      <div className="friendicon">
        <Row id="friend_username">
          {this.props.friend_username}
        </Row>
        <Row>
          <Col id="received">
            <div>
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
            <div>
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
    )
  }
}
