import React, { Component } from 'react';
import api from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link, Switch, Redirect } from 'react-router-dom';
class UserFormLogout extends Component {


    render() {

        return (
            <Form  encType="multipart/form-data"  method="POST" inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="email" name="email" id="email" value={this.props.user!=null?this.props.user.name:""}  placeholder="mail@gmail.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="password" name="password" value={this.props.user!=null?this.props.user.password:""} id="password" placeholder="********" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Button className="ml-auto" >Log-out</Button>
        </FormGroup>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         <Link  to="/user-info">{"Wellcom : "+(this.props.user!=null?this.props.user.name:"")}</Link>
         </FormGroup>
         
         </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(UserFormLogout);
