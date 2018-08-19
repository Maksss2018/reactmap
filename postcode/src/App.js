import React, { Component } from 'react';
import { Container, Row, Col, Label, ListGroup, ListGroupItem } from 'reactstrap';
import PostalForm from './components/form.js';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { apiPrefix } from './configs/configs.json';
import './App.css';
import HomeMap from "./components/map";
import ListFromDB from "./components/listFromDb";
const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      usersList: null,
      token: null
    };
    this.newUserEnter = this.newUserEnter.bind(this);
    this.dbChanges = this.dbChanges.bind(this);
    this.DeletefromList = this.DeletefromList.bind(this);
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



  render() {

    let list = this.state.usersList;

    return (
      <Container fluid>
        <Row className="App-header py-md-5 ">
        <Col xs={12} className="text-center">
        <h1>
        Find location by postal
        </h1>
        </Col>
        </Row>
        <Row >
        <Col xs={12}  md={4}>
        <PostalForm
        places={"loading"}
        GetnewMarkslist={this.dbChanges}
        />
        </Col>
        <Col xs={12}  md={4}>

        <Row className="my-5">
          <HomeMap
          token={this.state.token!==null?this.state.token:null}
          marks={list!==null?list.map((item)=>{
          return { lat:item.latLng[0],lng:item.latLng[1], info:{address:item.adress, postalCode: item.postalCode }} }):null}
          />        
        </Row>
  
        </Col>
  
        <Col xs={12} md={4} className="pt-1">
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
