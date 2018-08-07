import React, { Component } from 'react';
import { Row, Col, NavLink } from 'reactstrap';
import HomeMap from './Home-map';
class Home extends Component {

    render(){
        return (
   <Col xs={12} className=" ">
   <Row className="mt-5 mb-3 d-flex justify-content-center" >
   <Col xs={8} className=" text-center ">
   <h1>
    Twitter killer
   </h1>
   </Col>
   </Row>
  <Row className="mt-5 mb-3 d-flex justify-content-center" >
   <Col xs={8} className=" text-center ">
   
   <HomeMap/>
   
   </Col>
   </Row>
    </Col>
            )
    }
}
export default Home; 