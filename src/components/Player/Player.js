import React, { Component } from 'react';

export default class Player extends Component 
{
  constructor()
  {
    super();
    // this.state ={"token":
    // "BQCHHlOucOBWdnD6546v21Bm4dRZQOOaI_1lqQVFs1ydPIHkILiSdA4Y9Mp4Zg1lrQ_DQBHiX2GJl_BN0NlV0BlF_cReqNJrA2DnRQudukcgo3B2FAPCV-wr12s10TfJRB899E0x2NoSN_ubD5UlKQ9TwkFW9Kk4IBYUK0llrEwf-uP6dXdYNg_czAhE"}
  }

  componentDidMount()
  {
    this.checkPlayerInterval = setInterval(() => this.initializePlayer(), 1000);
  }

  initializePlayer()
  {
    console.log(window);
    console.log(window.closed);
    console.log(window.Spotify);

    if (window.Spotify !== undefined) 
    {
      this.player = new window.Spotify.Player({
        name: "Charlie's Website's Spotify Player",
        getOAuthToken: cb => { cb(localStorage.getItem("spotify_token")); },
      });
      // this.createEventHandlers();
  
      this.player.connect();
      clearInterval(this.checkPlayerInterval);
      this.createPlayerEventHandlers();
    }
  }

  createPlayerEventHandlers()
  {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => { console.log(state); });
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Player ready!");
      this.setState({ device_id: device_id });
      localStorage.setItem("device_id", device_id);
    });
  }


  render() {
    return (
      <div className="player">
        A player object is here!
      </div>
    )
  }
}
