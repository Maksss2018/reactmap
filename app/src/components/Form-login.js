import React, { Component } from 'react';
import api from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as actionsCreater from '../API/index.js';

class UserForm extends Component {
    constructor(){
        super();
        this.state={
            name:{
                value:"",
                validClass:""
            },
            password:{
                value:"",
                validClass:""
            }
        }
        this.inputEvent = this.inputEvent.bind(this);
        this.handelformAction =this.handelformAction.bind(this);
    }
    inputEvent(e){
        let value =e.target.value;
        let name = e.target.name;
        let validClass =this.inputValidate(name,value,value.length-1) ;
         console.log(" inputs value :"+e.target.value);
         this.setState({[name]:{value:value,validClass:validClass}});
         console.log(" inputs value"+[name]+" :"+validClass);
         this.handel
        
    }
      inputValidate(name,value,len){
        let  valid =" is-valide ",invalid = " is-invalide ",result;
        
        switch (name) {
            case "name":
                result = this.state.name.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")?valid:invalid;
                break;
            case 'password':
               result = len<=8?invalid:valid;
                break;
        }
        return result
    }
    

    handellogIn(e){
        e.preventDefault();/*
     let userTockeck ={
         password:e.target.,
         name:
     };   */
    }
    
     handelformAction(e){
      e.preventDefault();
      let/* btn =document.getElementById("send"),
      container = document.getElementById("component-container-form"),
      containerClass= container.className,
      btnClass=btn.className,*/
      inputs = this.state, validFormData, user ={
            name:inputs.name.value,
            password:inputs.password.value,
            logIn:true
            };
       
       validFormData= inputs.name.validClass!==" is-valide "||inputs.password.validClass!==" is-valide "?false:true;
        
       if(validFormData!==true){
     // btn.className=" bg-warning "+btnClass;
      console.log(" ERROR not valid data !! name : "+user.name+"; password : "+user.password);
       } else {
           this.props.loginLogoutAPI(user);
          console.log("  data send on server !!");
  //    btn.className=" bg-success "+btnClass;
      setTimeout(function(){
//        container.className="animated bounceOutLeft "+containerClass;
       this.setState({name:{value:"",validClass:""},password:{value:"",validClass:""},userLocation:{value:"",validClass:"",latLng:{}}
        });
        const cookies = new Cookies();
    /*       cookies.set("name",this.props.user.name);
           cookies.set("password",this.props.user.password);
           cookies.set("id",this.props.user._id);
           cookies.set("userLocationLan",this.props.user.marks[0].lat);
           cookies.set("userLocationLng",this.props.user.marks[0].lng);
           cookies.set("LogIn",this.props.user.logIn.toString());*/
           console.log("this.props.user :"+this.props.user.logIn);
      }.bind(this),2000);
      setTimeout(function(){
        
           console.log("this.props.user :"+this.props.user);
      
      }.bind(this),3000);
           
       }
         
     }
    render(){
         return(
         <Form  encType="multipart/form-data" onSubmit={this.handelformAction.bind(this)}  method="POST" inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input onChange={this.inputEvent.bind(this)} type="email" name="name" id="name" placeholder="mail@gmail.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input onChange={this.inputEvent.bind(this)} type="password" name="password" id="password" placeholder="********" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Link  to="/sign-in">Sign in</Link>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         <Button className="ml-auto" id="send" >Log-in</Button>
        </FormGroup>
                 </Form>
            )
    }
} 
function mapStateToProps(state){
     return {
         user: state.user,
     }
 };
export default connect ( mapStateToProps, actionsCreater) (UserForm); 