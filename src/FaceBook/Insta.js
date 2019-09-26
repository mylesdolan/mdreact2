//import Grid from "react-bootstrap";
//import asset from '../Assets/tester.jpg'

import queryString from 'query-string'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from 'axios';


class Insta extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.Test2 = this.Test2.bind(this);
        this.state = {};
console.log("Hi666666666666666666666666666666666666666666666666666666");
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values.code) // "top"
        console.log("Hi6666666666666666666666666666666666666666666666666666667");
        this.setState({ code: values.code });
        this.loadMore();
    }
    handleClick(){

        this.setState({});
console.log ("handleclicke");
    }
    Test2(){
        this.setState({});


    }

    loadMore = () => {
       // let end = this.state.end + this.state.amount;
      //  this.request(this.state.end,end)
      //  let mycode= (this.state.code);


        const profileData = {
            client_id: '35b7e4397b1a4809965a1b0f0fc493',
            access_token: this.state.code,
            client_secret: 'bf7f60a691714565ae1f48db572ba296',
            grant_type: 'authorization_code',
            //redirect_uri: 'http://localhost:3000/Insta',
            redirect_uri: 'https://shielded-badlands-64011.herokuapp.com/Insta',
            code: this.state.code
        };


      //  console.log ("mycode",mycode);
        axios.post(' https://api.instagram.com/oauth/access_token',profileData)
            .then(res => console.log("res",res))
            .catch(err => console.log("errorx",err))
        ;


    };

    render() {


        return (
            <div>

                <a href="#" onClick={this.loadMore}>Just Do this</a>
xxxxx
                xxxxx
                xxxxx
                xxxxx
            </div>
        );
    }

}
//see store.js in connector_S9
//export default connect()(Insta);
export {Insta};
