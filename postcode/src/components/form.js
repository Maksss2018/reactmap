import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { apiPrefix } from '../configs/configs.json';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
let cookies = new Cookies();
class PostalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLocation:{
                value:null},
            selectedPLaceses:[],
             error:false,
             errorText:null
        };
        this.pushNewPlace= this.pushNewPlace.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
       this.handelSendDataToserver = this.handelSendDataToserver.bind(this);
      this.isEquelData=this.isEquelData.bind(this);
        
    }
 /* 
    componentWillMount() {
        this.props.getTypesFromDB();
    };

*/
   deleteFromList(e){
       console.log(" index"+e.target.value);
        let index = e.target.value, 
        select = this.state.selectedPLaceses.filter((item,i)=>{
         if(i!==Number(index)){ 
             
             return item};  
        });
       this.setState({selectedPLaceses:select});
   }
    isEquelData(data){ 
        let token =cookies.get('token');
        console.log(" token from form.js "+cookies.get('token'));
        return axios.post(`${apiPrefix}/check-marks`, {token,check:data}).then((response) => {
                     response.data.arrayOfmarks.length!==0?this.setState({error:true, errorText:"This address ("+response.data.arrayOfmarks[0].adress+")  is already in DB"}):true;
                             }).catch((error)=>{console.log(" ERROR "+error)});
    
    }
    pushNewPlace(data){
        
                let location =data.geometry.location;
                let res = location.toString();
                let newPlace, flag= false;
                 data.address_components.map((item)=>{ 
                         if(item.types[0]=="postal_code"){ 
                 newPlace ={
                 latLng : res.slice(1,res.length-1).split(", "),
                 adress : data.formatted_address,
                 placeId : data.place_id,
                 postalCode:item //data.address_components[0]
                 }
                 return flag= true;
                             }
                         return item})
            let selectedPLaceses =this.state.selectedPLaceses.concat(newPlace);
                         
        flag!==false?this.setState({selectedPLaceses,error:false}):this.setState({error:true,errorText:"This is not a postal code"});

    }
    
    handleChange = address => {
            console.log(" adress :"+address);
        this.setState({ userLocation: { value: address } });
    };
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results =>{
            this.pushNewPlace (results[0]);
            this.isEquelData(results[0].formatted_address)
            console.error('++++results[0]+++' + JSON.stringify(results[0]));
            console.error('++++selectedPLaceses+++' + JSON.stringify(this.state.selectedPLaceses));
            getLatLng (results[0]);
            })
            .then(latLng => {
                
                this.setState({ userLocation: { latLng: latLng, validClass: " is-valide " } });
            })
            .catch(error => console.error('Error' + error));
    };
    handelSendDataToserver(e){
        e.preventDefault();
        const cookies = new Cookies();
        let data = {
            user:cookies.get("token")!=undefined?cookies.get("token"):"new",
            selectedPLaceses:this.state.selectedPLaceses
        };
        return axios.post(`${apiPrefix}/getNewUserData`, data).then((response) => {
                     const cookies = new Cookies();
                     cookies.set("token", response.data.user);
                     this.setState({selectedPLaceses:[]});
                     this.props.GetnewMarkslist(response.data.arrayOfmarks);
                             }).catch((error)=>{console.log(" ERROR "+error)});
    
        
    }
    
    render() {
   let        searchOptions = {
     types: ['(regions)']
     };
        return (
            <Col xs={12} className=" ">
  <Row className="mt-5 mb-3 d-flex justify-content-center" >
  
   <Col xs={12} className=" text-left ">
      <Form encType="multipart/form-data" onSubmit={this.handelSendDataToserver} method="POST">
        <FormGroup>
         {this.state.error!==true?<Label for="radius">Put Postal code you Looking for here : </Label>:<Label className=" text-danger " for="radius"> {this.state.errorText}  : </Label>}
        <PlacesAutocomplete
        value={this.state.userLocation.value}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
         searchOptions={searchOptions}>
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
        <Button>Submit</Button>
      </Form>
   </Col>
   </Row>
  <Row className="mt-5 mb-3 d-flex justify-content-center" >
  
   <Col xs={12} className=" text-left ">
  <ListGroup>
{this.state.selectedPLaceses.length!==0?this.state.selectedPLaceses.map((item,i)=>{ return <ListGroupItem key={"selectedPLaceses-"+i} id={"selectedPLaceses-"+i}> {item.adress} <button className=" ml-auto btn btn-danger" onClick={this.deleteFromList} value={i} > delete </button> </ListGroupItem> }):""}
 </ListGroup>
  </Col>
   </Row>
  
    </Col>
        )
    }
}
export default PostalForm;