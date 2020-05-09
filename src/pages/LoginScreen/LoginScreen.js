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
    this.login = this.login.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.register = this.register.bind(this);
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

  login()
  {
    //status code from backend API
    let code = -1;
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
      }})
    //.then(response => response.json())

    //TODO: 
    //if 200: save access token to localstorage, redirect to home page using useHistory
    //if 204: wipe input fields, say password wrong (probably link a "message_at_bottom" state to the jsx)
    //if 404: wipe input fields, say username not found
    .then(response =>
    {
      console.log(response);
      console.log('code:');
      console.log(response.status);
      code = response.status;
      console.log(code);
      //var data = response.json();
      //console.log(data, data['message']);
      console.log(response.body);
      console.log(JSON.stringify(response.body));
      return response.json();
    })
    .then(response => 
    {
      console.log('.json():',response);

      this.setState({error_message:response.message});
      console.log('code:',code);
      switch(code)
      {
        case 200:
          localStorage.setItem("access_token",response.access_token);
          localStorage.setItem("username",this.state.username);
          console.log(localStorage);
          //history.push('/home');
          
          this.setState({password:"",redirect:true});
          console.log(this.state);
          break;
        case 202:
          this.setState({password:""});
          //this.setState({error_message:'Username and password don\'t match. Try again.'});
          break;
        case 404:
          this.setState({username:"",password:""});
          //this.setState({error_message:'User not found.'});
          break;
      
      }
    })
  }

  //202 code: user already registered
  //200 code: success
  register()
  {
    //status code from backend API
    let code = -1;
    const submit_url = 'http://localhost:4000/api/register';  //config.backend_hostname 
    fetch(submit_url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
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

    .then(response =>
    {
      code = response.status;
      return response.json();
    })
    .then(response =>
    {
      console.log('.json():',response);

      this.setState({error_message:response.message});
      console.log(code);
      switch(code)
      {
        case 200:
          localStorage.setItem("access_token",response.access_token);
          localStorage.setItem("username",this.state.username);
          console.log(localStorage);
          //history.push('/home');
          
          this.setState({password:"",redirect:true});
          break;
        case 202:
          console.log('hi doing 202 handling');
          this.setState({username:"",password:""});
          //this.setState({error_message:'Username and password don\'t match. Try again.'});
          break;
      }
    })
  }

  renderRedirect()
  {
    if (this.state.redirect) {
      return <Redirect push to='/home' />
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
            <Row>
              <Col>
              <Button onClick={this.login}>Login</Button>
              </Col>
              <Col>
              <Button onClick={this.register}>Register</Button>
              </Col>
            </Row>
            
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
