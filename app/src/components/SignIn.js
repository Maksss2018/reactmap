import React, { Component } from 'react';
//import * as actions from '../actions/index';
import * as actionsCreater from '../API/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Button, Form, FormGroup, Input, Col, Row } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import "./SignIn.css"
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            name: {
                value: "",
                validClass: ""
            },
            password: {
                value: "",
                validClass: ""
            },
            userLocation: {
                value: "",
                validClass: "",
                latLng: null
            }


        }
        this.inputEvent = this.inputEvent.bind(this);
        this.handelformAction = this.handelformAction.bind(this);
    }

    inputEvent(e) {
        let value = e.target.value;
        let name = e.target.name;
        let validClass = this.inputValidate(name, value, value.length - 1);

        this.setState({
            [name]: { value: value, validClass: validClass }
        });
        this.handel

    }

    inputValidate(name, value, len) {
        let valid = " is-valide ",
            invalid = " is-invalide ",
            result;
        switch (name) {
            case "name":
                result = this.state.name.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") ? valid : invalid;
                break;
            case 'password':
                result = len <= 8 ? invalid : valid;
                break;
            case 'userLocation':
                result = len <= 1 ? invalid : valid;
                break;
        }
        return result
    }

    handelformAction(e) {
        e.preventDefault();
        let btn = document.getElementById("sendData"),
            msg = document.getElementById("msg"),
            container = document.getElementById("component-container"),
            containerClass = container.className,
            msgClass = msg.className,
            btnClass = btn.className,
            inputs = this.state,
            validFormData, newUser = {
                name: inputs.name.value,
                password: inputs.password.value,
                userLocation: inputs.userLocation.latLng,
                logIn: false
            };

        validFormData = inputs.name.validClass !== " is-valide " || inputs.password.validClass !== " is-valide " || inputs.userLocation.validClass !== " is-valide " ? false : true;

        if (validFormData !== true) {
            btn.className = " bg-warning " + btnClass;
            msg.className = " text-danger " + msgClass;
            msg.innerHTML = " You put some rong data or miss somesing  ";
        }
        else {
            this.props.SignIn(newUser);

            btn.className = " bg-success " + btnClass;
            msg.className = " text-info " + msgClass;
            msg.innerHTML = " Now registrated as : " + newUser.name;
            setTimeout(function() {
                container.className = "animated bounceOutLeft " + containerClass;
                this.setState({
                    name: { value: "", validClass: "" },
                    password: { value: "", validClass: "" },
                    userLocation: { value: "", validClass: "", latLng: {} }
                });

            }.bind(this), 2000);
            setTimeout(function() {
                if (this.props.user != null) {
                    const cookies = new Cookies();
                    cookies.set("name", this.props.user.name);
                    cookies.set("password", this.props.user.password);
                    cookies.set("id", this.props.user._id);
                    cookies.set("userLocationLan", this.props.user.marks[0].lat);
                    cookies.set("userLocationLng", this.props.user.marks[0].lng);
                    cookies.set("LogIn", this.props.user.logIn);
                    console.log("this.props.user :" + this.props.user.name);
                }
                console.log("this.props.user :" + this.props.user);
                /* route to user info component*/
            }.bind(this), 3000);

        }

    }

    handleChange = address => {
        this.setState({ userLocation: { value: address } });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ userLocation: { latLng: latLng, validClass: " is-valide " } });
            })
            .catch(error => console.error('Error' + error));
    };


    render() {
        console.log("this.state.inputs.name" + this.state.name.value)

        return (
            <Col xs={12} className=" text-center " id="component-container">
        <Row className="d-flex justify-content-center">
           <Col xs={8} >
         <Form className="p-1" row encType="multipart/form-data" onSubmit={this.handelformAction} method="POST" >
         <FormGroup className="p-1 mb-2 mr-sm-2 mb-sm-0">
          <Input type="email" 
          value={this.state.name.value}
          onChange={this.inputEvent}
          name="name" 
          id="email"
          className={"form-control"+this.state.name.validClass}
          placeholder="mail@gmail.com" />
        </FormGroup>
        <FormGroup className="p-1 mb-2 mr-sm-2 mb-sm-0">
          <Input type="password" 
          value={this.state.password.value}
          onChange={this.inputEvent} 
          name="password"
          id="password"
          className={"form-control"+this.state.password.validClass}
          placeholder="********" />
        </FormGroup>
        <FormGroup className="p-1 mb-2 mr-sm-2 mb-sm-0">
        <PlacesAutocomplete
        value={this.state.userLocation.value}
        onChange={this.handleChange}
        onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Name your position: County,City, street',
                className: 'location-search-input  '+this.state.userLocation.validClass+' form-control',
                name:"userLocation"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        </FormGroup>
      
        <Button id="sendData" className="ml-auto" >Sign-in</Button>
       <FormGroup className="p-1 mb-2 mr-sm-2 mb-sm-0">
         <h5 id="msg"></h5>
        </FormGroup>
       
      </Form>
            </Col>
        </Row>
        </Col>
        )
    }
}
/*
function matchDispatchToProps(dispatch){
     return bindActionCreators (
        {
           actions: actionsCreater
         },dispatch);
 };*/
function mapStateToProps(state) {
    return {
        user: state.user
    }
};
//export default connect ( mapStateToProps, matchDispatchToProps)(SignIn); 
export default connect(mapStateToProps, actionsCreater)(SignIn);
