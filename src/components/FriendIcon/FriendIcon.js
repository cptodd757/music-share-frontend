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
          <Col id="fromThem">
            {
              this.props.songsFromThem.map(song =>
                <Song info={song}>
                </Song>
                )
            }
          </Col>
          <Col id="toThem">
          </Col>
        </Row>
      </div>
    )
  }
}
