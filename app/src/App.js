import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import UserFormLogin from './components/Form-login';
import UserFormLogout from './components/Form-logout';
import Home from './components/Home';
import { connect } from 'react-redux';
import User from './components/User';
import SignIn from './components/SignIn';
import actions from './actions/index.js';
import * as actionsCreater from './API/index.js';
import './App.css';
//
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogIn: false,
            oldUser: {}
        }
    }
    componentWillMount() {
        let cookies = new Cookies(),
            password = cookies.get("password"),
            name = cookies.get("name"),
            LogIn = cookies.get("LogIn"),
            isLogIn = !password || !name ? false : true;
        isLogIn != true ? console.log("anonem") : this.props.sendResulttWithLoginAndPassword({ name, password });
    }
    render() {
        let user = this.props.user != null ? this.props.user : { logIn: false },
            rend = <Route  path="/" render={()=>{ return user.logIn!=true?<Home/>:<User/>;}} />;
        console.log(" user.LogIn " + user.LogIn);
        setTimeout(() => { console.log(" user.LogIn " + user.logIn) }, 500);
        let header = <Route  path="/"  render={()=>{ return user.logIn!=true?<UserFormLogin/>:<UserFormLogout/>;}} />;
        // this.props.Login(this.state.oldUser);
        console.log(" App.js report :" + user);
        return (
            <div className="App" >
        <Row className="App-header"> 
        {header}
        </Row>
        <Row >
         <Route  path="/sign-in"  render={()=>{ return user.logIn!=true?<SignIn/>:<h3>You allerdy our member!</h3>;}} />
         {rend}  
          
         
    
        </Row >
      </div>
        );
    }
}
/*
function matchDispatchToProps(dispatch){
     return bindActionCreators(
         {
           Login: actions.sendResulttWithLoginAndPassword,
          actionsCreater
           
           
        }, dispatch);
 };*/
function mapStateToProps(state) {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, actionsCreater)(App);
