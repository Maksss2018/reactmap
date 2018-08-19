import React, { Component } from 'react';
import { Container, Row, Col, Label, ListGroup, ListGroupItem, Form, FormGroup, Input, Button } from 'reactstrap';
import PostalForm from './components/form.js';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { apiPrefix } from './configs/configs.json';
import './App.css';
import HomeMap from "./components/map";
import logo from "./media/img/ukraineHigh.svg";
import ListFromDB from "./components/listFromDb";
import optionsMap from "./media/placestypes.json";
import Ionicon from 'react-ionicons';
import './media/less/index.less';
import Slider, { createSliderWithTooltip } from 'rc-slider';
const cookies = new Cookies();
const SliderWithTooltip = createSliderWithTooltip(Slider);

function percentFormatter(v) {
  return `${v*10} m`;
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      usersList: null,
      token: null,
      radius: null,
      type: null,
      center: null
    };
    this.newUserEnter = this.newUserEnter.bind(this);
    this.dbChanges = this.dbChanges.bind(this);
    this.DeletefromList = this.DeletefromList.bind(this);
    this.HandeNearestPlaces = this.HandeNearestPlaces.bind(this);
    this.getCenter = this.getCenter.bind(this);
  }
  componentDidMount() {
    const cookies = new Cookies();
    this.newUserEnter();
    if (cookies.get("token") !== undefined) { this.newUserEnter(); }

    if (cookies.get("token")) {
      let token = cookies.get("token");
      axios.post(`${apiPrefix}/dbState`, { token }).then((response) => {
        this.setState({ usersList: response.data.arrayOfmarks, token });
      }).catch((error) => { console.log(" ERROR " + error) });
    }
    else {
      this.newUserEnter();
    }

  }
  newUserEnter() {

    return axios.post(`${apiPrefix}/`).then((response) => {
      console.log("response.data.user ========  " + response.data.user);
      cookies.set("token", response.data.user);
    }).catch((error) => { console.log(" ERROR " + error) });

  }
  dbChanges(array) {
    this.setState({ usersList: array });
  }
  DeletefromList(adress) {
    let usersList = this.state.usersList.filter((item, index) => {
        if (item.adress !== adress) {
          return item
        }

      }),
      token = cookies.get("token");

    return axios.post(`${apiPrefix}/deleteMark`, { token, adress }).then((response) => {
      this.setState({ usersList });
    }).catch((error) => { console.log(" ERROR " + error) });

  }
  HandeNearestPlaces(e) {
    e.preventDefault();
    let radius = this.state.radius,
      type = this.state.type,
      center = cookies.get("center");

    return axios.post(`${apiPrefix}/get-nearest-places`, { radius, type, center }).then((response) => {
      console.log(" nearest " + type + " in radius " + radius + " == " + response.data);
    }).catch((error) => { console.log(" ERROR " + error) });
  }
  getCenter(data) {
    let center = data;
    console.log(" center =====" + center);
    this.setState({ center });
  }

  render() {

    let list = this.state.usersList,
      typesList = optionsMap.types.map((type, index) => {
        return <option key={`map-types-${index}`}  value={type} >{type}</option>
      });
    //  

    return (
      <Container fluid>
        <Row className="App-header py-md-5 " style={{background:`url(${logo})`,backgroundColor:"#222"}}>
        <Col xs={12} className="text-center animated-05s bounceInDown " >
        
        <span className="animated jackInTheBox" style={{fontSize:"1em",textShadow:"1px 2px 3px #666 !important"}}>
        by  Malyi M.G.
        
        </span>
        <h1 className="animated-3s fadeIn">
        Find location by postal
        <div className="compass-wrapper ml-3 my-sm-5" >
        <Ionicon className="mx-1  my-0 arrow-shake" icon="ios-compass"  fontSize="55px" color="#fff"/>
        </div>
        
        </h1>
        </Col>
        </Row>
      
        <Row>
      <Col xs={12} className="py-md-3" >
      
      <Form inline onSubmit={this.HandeNearestPlaces}>
        <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="radius" className="mr-2">Select radius</Label>
    <div className="m-5"  style={{width:"500px"}}>
      <SliderWithTooltip
        tipFormatter={percentFormatter}
        tipProps={{ overlayClassName: 'foo' }}
        onChange={(value)=>{  this.setState({radius:value*10}); }}
      />
</div>
        </FormGroup>
        
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0"  >
          <Label for="placesType" className="mr-2">Places type</Label>
          <Input defaultValue={"select type"}    onChange={(e)=>{ 
          console.log(" type "+e.target.value);
          this.setState({type:e.target.value}); }}  type="select" name="placesType" id="placesType">
            {typesList}
          </Input>
        </FormGroup>
        <Button>Submit</Button>
</Form>
      </Col>  
        </Row>
      
        <Row >
        <Col xs={12}  md={4} className="animated-1s fadeInUp " >
        <PostalForm
        places={"loading"}
        GetnewMarkslist={this.dbChanges}
        />
        </Col>
        <Col xs={12}  md={4} className="animated-2s fadeInUp " >

        <Row className="my-2 my-md-5">
          <HomeMap
          token={this.state.token!==null?this.state.token:null}
          marks={list!==null?list.map((item)=>{
          list.length!==0 ?cookies.set("center", { lat: Number(list[list.length - 1].latLng[0]), lng: Number(list[list.length - 1].latLng[1]) }) : cookies.set("center", { lat: 46.47, lng: 30.73 });
          return { lat:item.latLng[0],lng:item.latLng[1], info:{address:item.adress, postalCode: item.postalCode }} }):null}
          getCenter={this.getCenter}
          />        
        </Row>
  
        </Col>
  
        <Col xs={12} md={4} className=" py-2 pt-md-1 animated-3s fadeInUp " >
      <ListGroup className="mt-43"  >  
      <ListGroupItem className="no-border"  >
      <Label> Places you have already selected :</Label> 
      </ListGroupItem>
        {
        list!==null?list.map((item,index)=>{return <ListFromDB address={item.adress} delete={this.DeletefromList} index={index}/>}):<ListGroupItem> List is empty </ListGroupItem>
        }
        </ListGroup>  
        </Col>
        </Row>
      
      </Container>
    );
  }
}

export default App;
