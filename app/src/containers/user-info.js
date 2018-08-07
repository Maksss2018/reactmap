import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import  { check } from '../actions/index';
//import { Col, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';

 
class UserInfo extends Component {
  getInfo (){
    return    <li  onClick={()=>this.props.check(this.props.user)} key={this.props.user.id} > name: {this.props.user.name} ; id: {this.props.user.id} ?= {this.props.isChecked} </li>;
       

 }       
    render(){
        return(
            <ul>
            {this.getInfo()}
            </ul>
            )
    }
}
/*
function matchDispatchToProps(dispatch){
     return bindActionCreators(
         {check:check}, dispatch);
 };*/
function mapStateToProps(state){
     return {
         user: state.user,
         isChecked: state.checkedUser
     }
 };
 
export default connect (mapStateToProps/*,matchDispatchToProps*/)(UserInfo); 