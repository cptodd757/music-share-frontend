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
      "error_message":"",
      "showTextBox":false
    }
    this.addFriendClicked = this.addFriendClicked.bind(this);
    this.submitFriendClicked = this.submitFriendClicked.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  updateText(event)
  {
    this.setState({friend_username:event.target.value});
    console.log('state: ',this.state);
  }

  addFriendClicked()
  {
    this.setState({"showTextBox":true});
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

  render() {
    return (
      <div className="menu">
        <div id="username">
          Welcome, {this.props.username}!
        </div>
        <br></br>

        <Button onClick={this.addFriendClicked}>
          Add a Friend!
        </Button>
        <br></br>

        <div style={{display: this.state.showTextBox ? "block" : "none"}}>
          <Input type="textarea" value={this.state.friend_username} onChange={this.updateText}>
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
    )
  }
}
