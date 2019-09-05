/* global FB*/
import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-bootstrap';
//import Grid from "react-bootstrap";
import { Container,Row, Col } from 'react-bootstrap';
class Fb extends Component {
    constructor(props) {
        super(props);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.testAPI = this.testAPI.bind(this);
        this.buildProfile = this.buildProfile.bind(this);
        this.buildFeed = this.buildFeed.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '2178816318912864',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.AppEvents.logPageView();
            FB.Event.subscribe('auth.statusChange', function(response) {
                if (response.authResponse) {
                    this.checkLoginState();
                } else {
                    console.log('---->User cancelled login or did not fully authorize.');
                }
            }.bind(this));
        }.bind(this);

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    testAPI() {
        var self = this;
       // this.buildProfile(response);
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });

        FB.api('/me?fields=name,email,birthday,location', function(response){

            if(response && !response.error){
                //console.log(response);
               self.buildProfile(response);
            }

            FB.api('/me/feed', function(response){
                if(response && !response.error){
                 self.buildFeed(response);
                }
            });
        })


    }

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    }

    checkLoginState() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleClick() {
        FB.login(this.checkLoginState());
    }

     buildProfile(user){
        let profile = `
          <h3>${user.name}</h3>
          <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Birthday: ${user.birthday}</li>
            <li class="list-group-item">User ID: ${user.location.name}</li>
          </ul>
        `;

        document.getElementById('profile').innerHTML = profile;
    }

      buildFeed(feed){
        let output = '<h3>Latest Posts</h3>';
        for(let i in feed.data){
            if(feed.data[i].message){
                output += `
              <div class="well">
                ${feed.data[i].message} <span>${feed.data[i].created_time}</span>
              </div>
            `;
            }
        }

        document.getElementById('feed').innerHTML = output;
    }





    render() {
        return (
            <main>
                <Container fluid>
                    <h1>
                        Facebook Login
                    </h1>
                </Container>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <a href="#" onClick={this.handleClick} onlogin={this.checkLoginState}>Login</a>
                            <div id="status"></div>
                            <div id="profile"></div>
                            <div id="feed"></div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

export {Fb};
