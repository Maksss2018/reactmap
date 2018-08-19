/*global google*/
import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
class CostumeMarker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: false,
        };
        this.handelHovermarker = this.handelHovermarker.bind(this);
    }


    handelHovermarker() {
        console.log(" hovered item");
        this.setState({ info: true });
    }


    render() {
        console.log(" postal COde :" + JSON.stringify(this.props.postalCode));
        /*
			  <p>Long postal code : {this.props.postalCode.longName}</p>
			 <p>short postal code :{this.props.postalCode.shortName} </p>*/

        return (
            <Marker
        className="animated infinite pulse "
        key={"map-marker"+this.props.index}
        onMouseOver={this.handelHovermarker }
        defaultAnimation={google.maps.Animation.DROP}
        position={this.props.position}>
        {this.state.info!==false?<InfoWindow   >
        		
		<ListGroup>
		<ListGroupItem className="no-border">
			<h5>{this.props.info.address}</h5>
		</ListGroupItem>
		<ListGroupItem className="no-border">
		Long postal code :  <Badge color="info">{this.props.postalCode.longName}</Badge>
		</ListGroupItem>
		<ListGroupItem className="no-border">
		short postal code : <Badge color="warning">{this.props.postalCode.shortName}</Badge> 
		</ListGroupItem>
		</ListGroup>
			 		 </InfoWindow>:""}
            
            </Marker>
        )
    }
}


export default CostumeMarker;
