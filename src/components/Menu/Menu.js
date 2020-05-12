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
    console.log(window);
    console.log(window.closed);
    console.log(window.Spotify);
    this.setState({"showAddFriendPrompt":!this.state.showAddFriendPrompt});
  }

  sendSongClicked()
  {
    this.setState({"showSendSongPrompt":!this.state.showSendSongPrompt});
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
      {
        this.setState({error_message:response.message});
        this.setState({"showAddFriendPrompt":false});
      })
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
      {
        this.setState({"showSendSongPrompt":false});
      })
  }

  render() {
    return (
      <div className="menu">
        <div className="menu-card">
          <div className="welcome-username">
            Welcome, {this.props.username}!
          </div>
          <br></br>

          <div>
            <div className="buttonwrapper">
              <Button outline onClick={this.addFriendClicked}>
                Add a Friend!
              </Button>
            </div>
            <br></br>

            <div style={{display: this.state.showAddFriendPrompt ? "block" : "none"}}>
              Username:
              <Input id="friend_username" type="textarea" value={this.state.friend_username} onChange={this.updateText}>
              </Input>
              <br></br>
              <div className="buttonwrapper">
                <Button outline onClick={this.submitFriendClicked}>
                  Submit
                </Button>
              </div>
              <br></br>

              
            </div>
            <div id="error_message">
               {this.state.error_message}
            </div>
          </div>
          <br></br>

          <div>
            <div className="buttonwrapper">
              <Button outline onClick={this.sendSongClicked}>
                Send a Song!
              </Button>
            </div>
            <br></br>

            <div style={{display: this.state.showSendSongPrompt ? "block" : "none"}}>
              Friend's username:
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

              <div className="buttonwrapper">
                <Button outline onClick={this.submitSongClicked}>
                  Send!
                </Button>
                </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
