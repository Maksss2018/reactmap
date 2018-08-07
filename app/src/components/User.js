/*global google*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeMap from './Home-map';
import * as actionsCreater from '../API/index.js';
//import  { check } from '../actions/index';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class User extends Component {

    constructor() {
        super();
        this.state = {
            selectOption: [],
            radius: 100,
            placesType: "address",
        };
        this.handelInputChange = this.handelInputChange.bind(this);
    }
    componentWillMount() {
        this.props.getTypesFromDB();
    };



    handelInputChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        console.log("select :" + name + " == " + value);
        this.setState({
            [name]: value
        });
        setTimeout(function() {
            /*autocomplete here using*/
            /* for selfnavigation of google map,We*/
            let radius = this.state.radius ? this.state.radius : 100,
                placesType = this.state.placesType ? this.state.placesType : "address",
                marks = this.props.user != null ? this.props.user.marks : [{ lat: -30.30, lng: 40.33 }],
                arrayOfMarks = marks.map((item) => { return { lat: item.lat, lng: item.lng } }),
                lat = marks[0].lat,
                lng = marks[0].lng;
            let obj = {
                radius: radius,
                type: placesType,
                lat: lat,
                lng: lng
            };
            console.log(" marks :" + marks[0].lat);
            this.props.getMarksByType(obj);


        }.bind(this, 100))
    }
    render() {
        console.log("this.props.places ", this.props.places);
        let options = this.props.places != "loaded" ? this.props.places : "loaded",
            optionsMap = options != "loaded" ? options.map(function(item, ind) { return <option key={ind} value={item}>{item}</option> }) : options,
            marks = this.props.user != null ? this.props.user.marks : [{ lat: -30.30, lng: 40.33 }],
            arrayOfMarks = marks.map((item) => { return { lat: item.lat, lng: item.lng } });

        console.log("nearestPlaces : " + JSON.stringify(this.props.nearestPlaces));
        return (
            <Col xs={12} className=" ">
   <Row className="mt-5 mb-3 d-flex justify-content-center" >
   <Col xs={8} className=" text-center ">
   <h4>
    Here you can put marks on the map:
   </h4>
   </Col>
   </Row>
  <Row className="mt-5 mb-3 d-flex justify-content-center" >
   <Col xs={8} className=" text-center ">
   
 
   <HomeMap
   marks={this.props.user!=null?this.props.user.marks:""}
   radius={this.state.radius}
   placesType={this.state.placesType}
   />
   
   </Col>
   <Col xs={3} className=" text-left ">
   <h5>Put some marks on map {this.props.user!=null?this.props.user.name:""} :</h5>
   
      <Form>
        <FormGroup>
          <Label for="placesType">Places type</Label>
          <Input defaultValue={"select type"} onChange={this.handelInputChange} type="select" name="placesType" id="placesType">
            {optionsMap}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="radius">Select radius</Label>
          <Input  onChange={this.handelInputChange} type="select" name="radius" id="radius" multiple>
            <option defaultValue={100}  >100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
            <option value={500}>500</option>
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
   </Col>
   </Row>
    </Col>
        )
    }
}
/*
function matchDispatchToProps(dispatch){
     return bindActionCreators(
         {check:check}, dispatch);
 };*/
function mapStateToProps(state) {
    return {
        user: state.user,
        places: state.places,
        nearestPlaces: state.nearestPlaces
    }
};

export default connect(mapStateToProps, actionsCreater)(User);
