import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink  } from 'reactstrap';
class Navmenu extends Component {
//if return cookie.get("login")!=false&cookie.get("password")!=false? <Route path="/:id" component={UserAccount}>:<Route path="/log-in" component={UserInfo}>;

 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

    render(){
        let signIn =  <NavItem>
                <NavLink href="/in-out/">{this.props.logIn!=true?"Sign-in":this.props.msg}</NavLink>
              </NavItem>;
        return(
        <Navbar color="dark" light expand="lg">
        
        <Nav className="ml-auto hidden-sm-down">
              <NavbarBrand style={{ color:"#8ce40e!important", fontSize:"1.5em"}} href="/">
                Map
              </NavbarBrand>
              <NavItem color="white" >
                <NavLink  href="/in-out/">{this.props.logIn!=true?"Log-in":"Log-out"}</NavLink>
              </NavItem>
              {signIn}
        </Nav>
        
          <NavbarToggler className="hidden-md-up" onClick={this.toggle} />
          <Collapse className="hidden-md-up" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  >
                <NavLink className="text-color-lemon"  href="/in-out/">{this.props.logIn!=true?"Log-in":"Log-out"}</NavLink>
              </NavItem>
              <NavItem color="white" >
                <NavLink className="text-color-lemon" style={{  color:"#8ce40e!important" }} href="/in-out/">{this.props.logIn!=true?"Log-in":"Log-out"}</NavLink>
              </NavItem>
              
              {this.props.logIn!=true?signIn:this.props.msg}
              
              </Nav>
          </Collapse>
        </Navbar>
            
            )
    }
} 
export default Navmenu; 
/*
function mapStateToProps(state){
     return {
         logIn: state.user.logIn
     }
 };
 */
/*export default connect (mapStateToProps/*,matchDispatchToProps*///)(Navmenu);