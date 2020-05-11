import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import './Song.css';

export default class Song extends Component {
  render() {
    return (
      <div className="song-wrapper">
        <div className="song">
          <Row>
            <Col>
            {this.props.info.title}
            </Col>
            <Col>
            {this.props.info.artist}
            </Col>
            <Col>
            {this.props.info.note}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
