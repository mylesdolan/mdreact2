/* global FB*/
import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-bootstrap';
//import Grid from "react-bootstrap";
import asset from '../Assets/tester.jpg'
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
        });
        this.download2();
//        this.download();
    }

    loadXHR(url) {

        return new Promise(function(resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = function() {reject("Network error.")};
                xhr.onload = function() {
                    if (xhr.status === 200) {resolve(xhr.response)}
                    else {reject("Loading error:" + xhr.statusText)}
                };
                xhr.send();
            }
            catch(err) {reject(err.message)}
        });
    }



    download2(){
        this.loadXHR("https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/69616027_2235481496560508_6254272110181482496_o.jpg?_nc_cat=100&_nc_oc=AQnPcwBKhgtkqy_JndRIhOTvidYpExjo16FSCCQJDfQZuXCb7Wb0Trx4ESNcpw5OxRg&_nc_ht=scontent.xx&oh=51e5b3962fbd0a4161ff4d2f4aa03895&oe=5DF6BADA").then(function(blob) {
            console.log('newblob',blob);
            document.getElementById('img').setAttribute('src',blob);
        });

    }



    download(){

       // https://stackoverflow.com/questions/50248329/fetch-image-from-api
        var outside;
     //   return new Promise((resolve, reject) => {
        const downloadUrl="https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/69616027_2235481496560508_6254272110181482496_o.jpg?_nc_cat=100&_nc_oc=AQnPcwBKhgtkqy_JndRIhOTvidYpExjo16FSCCQJDfQZuXCb7Wb0Trx4ESNcpw5OxRg&_nc_ht=scontent.xx&oh=51e5b3962fbd0a4161ff4d2f4aa03895&oe=5DF6BADA";
       fetch('https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/69616027_2235481496560508_6254272110181482496_o.jpg?_nc_cat=100&_nc_oc=AQnPcwBKhgtkqy_JndRIhOTvidYpExjo16FSCCQJDfQZuXCb7Wb0Trx4ESNcpw5OxRg&_nc_ht=scontent.xx&oh=51e5b3962fbd0a4161ff4d2f4aa03895&oe=5DF6BADA')
           .then(response => response.blob())
           .then(data => {
               outside=URL.createObjectURL(data);
               console.log('outside',outside);

           })
           .then(x => {
              this.saveBlob(outside);
           })
       ;


        console.log('after fetch');
        console.log('after after fetch');

        // const reading = $.Deferred();
        var postData = new FormData();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', downloadUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            var blob = xhr.response;
        //    this.saveOrOpenBlob(blob);
        }.bind(this);
       xhr.send(postData);
        console.log('postdata',postData);
       // endof promise thing });


    }

saveBlob(outside)
{
    let arr = outside.split(','), mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);

    }
    const blobby =  new Blob([u8arr], {type:mime});

    console.log ('second',outside);
    let reader = new FileReader();

    reader.onloadend = function() {
        let base64data = reader.result;
        console.log('image',base64data);
    };
    reader.readAsDataURL(blobby);
}

    /*
       saveOrOpenBlob(blob) {
           //this.imageElement = document.element.querySelector("img");
           console.log("blob",blob);
         //  var assetRecord = this.getAssetRecord();
           const fileName = 'Test.mp4';
           const tempEl = document.createElement("a");
           document.body.appendChild(tempEl);

           //tempEl.style = "display: none";
           const url = window.URL.createObjectURL(blob);
           console.log('url',url);
          // this.imageElement.src = url;
           //document.element.querySelector("img").src=url;
           tempEl.href = url;

           tempEl.download = fileName;
         //  document.getElementById('thisawlthing').appendChild(tempEl);
          // document.element.querySelector("img").src=tempEl;
          // document.element.querySelector("img").src=asset;
         //  document.getElementById('img').querySelector<HTMLInputElement>('.src').value=asset;
           //document.getElementById('img').src=asset;
           // asset=document.getElementById('img') as HTMLImageElement;
          // document.getElementById('img').setAttribute('src',asset);
           document.getElementById('img').setAttribute('src',url);

           tempEl.click();



           window.URL.revokeObjectURL(url);
           console.log('IM HERE');
       }

   */

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
                            <img id="img" style={{ height: '300px',width: '300px', border: '1px'}}></img>
                            {/*  <img src={asset} style={{ height: '300px',width: '300px', border: '1px'}}></img>*/}
                            {/*  <img src={'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/69616027_2235481496560508_6254272110181482496_o.jpg?_nc_cat=100&_nc_oc=AQnPcwBKhgtkqy_JndRIhOTvidYpExjo16FSCCQJDfQZuXCb7Wb0Trx4ESNcpw5OxRg&_nc_ht=scontent.xx&oh=51e5b3962fbd0a4161ff4d2f4aa03895&oe=5DF6BADA'}
                            id="img" style={{ height: '300px',width: '300px', border: '1px'}}></img>*/}
                            <div id="status"></div>
                            <div id="profile"></div>
                            <div id="feed"></div>
                            <div id="thisawlthing"></div>

                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

export {Fb};
