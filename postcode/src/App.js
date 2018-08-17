import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem  } from 'reactstrap';
import PostalForm from './components/form.js';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { apiPrefix } from './configs/configs.json';
import './App.css';
import HomeMap  from "./components/map";
const cookies = new Cookies();

class App extends Component {
  constructor(){
    super();
    this.state={
      usersList:null
    };
   this.newUserEnter =this.newUserEnter.bind(this);
   this.dbChanges = this.dbChanges.bind(this);
  }
  componentDidMount(){
     const cookies = new Cookies();
       this.newUserEnter();
     if(cookies.get("token")!==undefined){this.newUserEnter();}
     
        if(cookies.get("token")){
          let token =cookies.get("token");
          axios.post(`${apiPrefix}/dbState`, {token}).then((response) => {
         this.setState({usersList:response.data.arrayOfmarks});
                             }).catch((error)=>{console.log(" ERROR "+error)});
        }else{
          this.newUserEnter();
        }
        
  }
  newUserEnter(){
    
    return axios.post(`${apiPrefix}/`).then((response) => {
    console.log("response.data.user ========  "+response.data.user);
                     cookies.set("token", response.data.user);
                             }).catch((error)=>{console.log(" ERROR "+error)});

  }
  dbChanges(array){
                     this.setState({usersList:array});
  }
  render() {
      
      let list= this.state.usersList;
      
    return (
      <Container>
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
        <Col xs={12}  md={8}>

        <Row className="my-5">
          <HomeMap
          marks={list!==null?list.map((item)=>{
          console.log(" listlistitem "+JSON.stringify(item.latLng[1]));
          return { lan:item.latLng[0],lng:item.latLng[1]} }):null}
          />        
        </Row>
  
        <Row className="my-5">
        <Col xs={12}>
        <h5> Places you have already selected :</h5>
        </Col>
        <Col xs={12}>
        <ListGroup>
        {
        list!==null?list.map((item,index)=>{return <ListGroup key={"place-"+index} > {item.adress}</ListGroup>}):<ListGroup> Loading </ListGroup>
        }
        </ListGroup>
        
        </Col>
        </Row>
        </Col>
        </Row>
      
      </Container>
    );
  }
}

export default App;
