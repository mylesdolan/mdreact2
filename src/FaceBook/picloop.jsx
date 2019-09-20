    /* global FB*/
    import React, { Component } from 'react';
    //import { Grid, Row, Col } from 'react-bootstrap';
    //import Grid from "react-bootstrap";
    import asset from '../Assets/tester.jpg'
    import { Container,Row, Col } from 'react-bootstrap';

type State = {
        Fromfbx:JSON;
    }

        class PicLoop extends Component {


            constructor(props) {

                super(props);
               /* this.state = {
                    FB:JSON,
                    Fromfbx:[],
                }*/
                console.log("props",props);
                let Fromfb=props.thing;
                console.log("xxxxxxxxxxxxxxxxxxu",props.thing);
               console.log("xxxxxxxxxxxxxxxxxx",Fromfb);
                this.setState({Fromfbx:this.Fromfb});
             //   console.log("oooooooooooooooo",this.state.Fromfbx);
                this.handleClick = this.handleClick.bind(this);
                this.Test2 = this.Test2.bind(this);
              //  this.state = {};


            }

                    componentDidMount() {
                        var self = this;
                        console.log("sssssssssssssst",this.props.thing);
              //  console.log("ssssssssssssss",this.state.Fromfbx);
                //        this.state.Fromfb.api('/417230442252839/feed?fields=full_picture,description,created_time,comments{message},caption,message&limit=15', function(response){
                        this.props.thing.api('/417230442252839/feed?fields=full_picture,description,created_time,comments{message},caption,message&limit=15', function(response){

                            if(response && !response.error){
                                //this.state.Pics= self.buildPicFeed(response);
                               self.buildPicFeed(response);
                            }
                        });


                    }
            handleClick(){

                this.setState({});

            }
            Test2(){
                this.setState({});


            }


            buildPicFeed(feed){
                let output = '<h3>Latest Pics</h3>';
                for(let i in feed.data){
                    if(feed.data[i].full_picture){
                        output += `
                     <div class="well">
                  ${feed.data[i].full_picture} <span>${feed.data[i].created_time}</span>
                  
                  <img src=${feed.data[i].full_picture} id="img" style={{ height: '300px',width: '300px', border: '1px'}}></img>
                  
                 </div>
                    `;
                    }
                    this.setState({

//                Fromfb: feed.data,

                    });

                }


                 document.getElementById('picfeed').innerHTML = output;
            }
            render() {


                return (
                    <div>

                        <a href="#" onClick={this.handleClick}>Just Do this</a>

                        hello   hello   hello   hello   hello   hello   hello   hello
                        hello

                        <div id="picfeed"></div>

                    </div>
                );
            }

        }

        export default PicLoop;











