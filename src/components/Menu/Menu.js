import React, { Component } from 'react';
import './Menu.css';
import { Button, Input } from 'reactstrap';

export default class Menu extends Component 
{

  constructor()
  {
    super();
    this.state = {
      "friend_username":"",
      "song":"",
      "note":"",
      "error_message":"",
      "showAddFriendPrompt":false,
      "showSendSongPrompt":false
    }
    this.addFriendClicked = this.addFriendClicked.bind(this);
    this.submitFriendClicked = this.submitFriendClicked.bind(this);
    this.sendSongClicked = this.sendSongClicked.bind(this);
    this.submitSongClicked = this.submitSongClicked.bind(this);

    this.updateText = this.updateText.bind(this);
  }

  updateText(event)
  {
    this.setState({[event.target.id]:event.target.value});
    console.log('state: ',this.state);
  }

  addFriendClicked()
  {
    this.setState({"showAddFriendPrompt":true});
  }

  sendSongClicked()
  {
    this.setState({"showSendSongPrompt":true});
  }

  submitFriendClicked()
  {
    let submit_url = 'http://localhost:4000/api/add_friend';
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
      body: JSON.stringify({"friend_username":this.state.friend_username})
    })
    //.then(response => response.json())

    .then(response =>
    {
      console.log(response);
      return response.json();
    })
    .then(response => 
      {})
  }

  submitSongClicked()
  {
    let submit_url = 'http://localhost:4000/api/add_track';
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
      body: JSON.stringify({"friend_username":this.state.friend_username,
                            "track_url":this.state.song,
                            "note":this.state.note})
    })
    //.then(response => response.json())

    .then(response =>
    {
      console.log(response);
      return response.json();
    })
    .then(response => 
      {})
  }

  render() {
    return (
      <div className="menu">
        <div id="username">
          Welcome, {this.props.username}!
        </div>
        <br></br>

        <div>
          <Button onClick={this.addFriendClicked}>
            Add a Friend!
          </Button>
          <br></br>

          <div style={{display: this.state.showAddFriendPrompt ? "block" : "none"}}>
            <Input id="friend_username" type="textarea" value={this.state.friend_username} onChange={this.updateText}>
            </Input>
            <Button onClick={this.submitFriendClicked}>
              Submit
            </Button>
            <br></br>

            <div id="error_message">
              {this.state.error_message}
            </div>
          </div>
        </div>
        <br></br>

        <div>
          <Button onClick={this.sendSongClicked}>
            Send a Song!
          </Button>
          <br></br>

          <div style={{display: this.state.showSendSongPrompt ? "block" : "none"}}>
            Username:
            <Input id="friend_username" type="textarea" value={this.state.friend_username} onChange={this.updateText}>
            </Input>
            <br></br>

            Link to song:
            <Input id="song" type="textarea" value={this.state.song} onChange={this.updateText}>
            </Input>
            <br></br>

            Note (optional):
            <Input id="note" type="textarea" value={this.state.note} onChange={this.updateText}>
            </Input>
            <br></br>

            <Button onClick={this.submitSongClicked}>
              Send!
            </Button>
            <br></br>
          </div>
        </div>

      </div>
    )
  }
}
