import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
//import SpotifyPlayer from 'react-spotify-web-playback';

import Menu from '../../components/Menu/Menu.js';
import FriendIcon from '../../components/FriendIcon/FriendIcon.js';
import Player from '../../components/Player/Player.js';

import './Home.css';

const clientId = "407785d98df44f92b0ef92d9259e895e";
const redirectUri = "http://localhost:3000/home";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-email",
  "user-read-private",
  "streaming"
];
const authEndpoint = "https://accounts.spotify.com/authorize";

export default class Home extends Component 
{
  constructor()
  {
    super();
    this.state = {"friends":[]}//,
                  // "token":"BQCfrS_cJ4_ikYWsg1GkCk_jtt9BrZMb1dSyX967ishL5v42PfWj57ftf246qkoseXyveBNKSoVJF2zHVqY2S0WbdOzc_LhvpJ3_d5QzPKapzA2Ja5cQy_A9zA0HKHXq7TEhLGCCIhZ6tToC0gFxyYhsp-hJ-6rNbPfqFzBoJwoqrfaBXKAiu6o"}
  }

  componentDidMount()
  {
    console.log(window);
    console.log(window.closed);
    console.log(window.Spotify);
    
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
      console.log(window.location.hash);

      let token = window.location.hash.substring(1);
      token = token.substring(token.indexOf("=")+1,token.indexOf("&"));
      console.log(token);
      localStorage.setItem("spotify_token",token);
      console.log(localStorage);
    })
    // this.checkPlayerInterval = setInterval(() => this.initializePlayer(), 1000);
  }

  render() 
  {
    return (
      <div className="home">
        <div className="a-wrapper">
          Click&nbsp;    
          <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
             here 
          </a>
          &nbsp;to login to Spotify and enable playback controls!
        </div>

        <Row>
          <Col xs="3">
            <Menu username={localStorage.getItem("username")}/>
            <Player/>
          </Col>
          <Col xs="9">
            <div className="friends-header-wrapper">
              
              <div className="friends-header">
                Your Friends:
              </div>
            
            </div>
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
