import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import './Song.css';

export default class Song extends Component 
{
  constructor()
  {
    super();
    this.playSong = this.playSong.bind(this);
  }

  playSong()
  {
    let url = '	https://api.spotify.com/v1/me/player/play?device_id='+localStorage.getItem("device_id");
    fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + localStorage.getItem("spotify_token")
      },
      body: JSON.stringify({"uris":["spotify:track:"+this.props.info.id]})
    })
    .then(response => {
      console.log(response);
    })
  }

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
            <Col>
              <Button onClick={this.playSong}>
                Play!
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
