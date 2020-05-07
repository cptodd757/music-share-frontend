import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Containter, Row, Col } from 'reactstrap';

//this doesnt work cuz hooks are only for function comps
//import { useHistory } from "react-router-dom";

import { Redirect } from 'react-router-dom';

import './LoginScreen.css';
var Buffer = require('buffer/').Buffer

export default class LoginScreen extends Component 
{
  
  constructor()
  {
    super();
    this.state = {
      username: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleChange(event)
  {
    let param_id = event.target.id;
    let value = event.target.value;
    //this.setState((name, value) => {console.log(name,value); return {name: value}})
    this.setState({[param_id]: value});
    console.log('onChange method called!',event.target.id,event.target.value);
    console.log('state:',this.state)
  }

  //TODO: once submitted, if right, reidrect to a home page. else try again
  submit()
  {
    const submit_url = 'http://localhost:4000/api/login';  //config.backend_hostname 
    fetch(submit_url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': new Buffer(this.state.username + ':' + this.state.password).toString('base64')
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer'// no-referrer, *client
      // body: JSON.stringify({username:this.state.username,
      //                       password:this.state.password}), // body data type must match "Content-Type" header
    })
    //.then(response => response.json())

    //TODO: 
    //if 200: save access token to localstorage, redirect to home page using useHistory
    //if 204: wipe input fields, say password wrong (probably link a "message_at_bottom" state to the jsx)
    //if 404: wipe input fields, say username not found
    .then(response =>
    {
      console.log(response);
      console.log('code:');
      console.log(response.status)
      switch(response.status)
      {
        case 200:
          localStorage.setItem("access_token",response.body.access_token);
          console.log(localStorage);
          //history.push('/home');
          this.setState({error_message:'Success!'});
          this.setState({redirect:true});
        case 204:
          this.setState({username:"",password:""});
          this.setState({error_message:'Username and password don\'t match. Try again.'});
        case 404:
          this.setState({username:"",password:""});
          this.setState({error_message:'User not found.'});
      }
    })
  }

  renderRedirect()
  {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  render() 
  {
    return (
      <div className="loginscreen">
        {this.renderRedirect()}
        <div className="wrapper">
          <div className="card">
            <Form>
              <FormGroup>
                <Label for="username"> Username </Label>
                <Input id="email" type="email" name="username" id="username" value={this.state.username} onChange={this.handleChange}/>
              </FormGroup> 
              <br></br>
              <FormGroup>
                <Label for="password"> Password </Label>
                <Input id="password" type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
              </FormGroup> 
            </Form>
            <br></br>
            <Button onClick={this.submit}>Login</Button>
            <br></br>
            <div id="error_message">
              {this.state.error_message}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
