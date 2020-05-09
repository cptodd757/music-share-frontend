import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export default class Song extends Component {
  render() {
    return (
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
        <br></br>
      </div>
    )
  }
}
