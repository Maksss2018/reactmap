import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
class ListFromDB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: false,
            animation: "animated bounceInRight "
        };
        this.handelHovermarker = this.handelHovermarker.bind(this);
    }


    handelHovermarker() {
        this.setState({ info: true });
    }


    render() {
        console.log(" postal COde :" + JSON.stringify(this.props.postalCode));
        /*
			  <p>Long postal code : {this.props.postalCode.longName}</p>
			 <p>short postal code :{this.props.postalCode.shortName} </p>*/

        return (
            <ListGroupItem  
            onMouseOut={()=>{
                let animation =" ";
                this.setState({animation})
            }}
            onMouseOver={()=>{
                let animation ="animated  pulse ";
                this.setState({animation})
            }}
            key={"item-from-db"+this.props.index} className={this.state.animation+"  no-border "}>
		{this.props.address}
		<Button type="button" className="my-2 ml-auto btn-small small-font-size " outline color="danger" onClick={()=>{
	    this.setState({animation:"animated  bounceOut "});
	   
	    setTimeout(()=>{
	        this.props.delete(this.props.address)
	    },1000);
		}   
		} color="danger">remove</Button> 
		</ListGroupItem>
        )
    }
}


export default ListFromDB;
