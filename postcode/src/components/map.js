import React, { Component } from 'react';
import { withGoogleMap, Circle, GoogleMap, Marker } from 'react-google-maps';
const MapForTwitterKiller = withGoogleMap((props) => {
    
    console.log(" home-map props.markers " + (props.markers ? JSON.stringify(props.markers) : false));
    let circel = (a, b) => {
        return <Circle editable   center={a} radius={b}/>
    };

    return <GoogleMap 
    defaultZoom = { 12 }
    defaultCenter = { { lat: 46.47, lng: 30.73 } }
    center={props.center}
    onClick={props.onClick}
    ref={props.onMapLoad}
        >
        {props.markers!=null?props.markers.map((item,index)=>{
    
        let lat=Number(item.lan),lng=Number(item.lng);
        console.log("lat "+lat+" lng"+lng);
        return <Marker  position={{lat,lng}}/>}):""}
        
        </GoogleMap>

});
class HomeMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marksOn: [],
            map: null
        };

    }

    handelMapClick(e) {}

    onLoadMap(map) {
        if (this.state.map !== null)
            return
        this.setState({ map: map })
    }
    handelClickOnMap() {
        let map = this.state.map.isReactComponent;
    }
    
    
    
    render() {

        let marks = this.props.marks!== null ? this.props.marks.map(function(item, ind) {

                return item
            }) : [{ lat: 46.47, lng: 30.73 }];
            
         console.log(" marks "+ JSON.stringify(marks));
        return (
            <div style={{ height: '100vh', width: '100%' }}>
        <MapForTwitterKiller
        markers={ marks }
        center={marks[0]}    
        containerElement={
        <div style={{height:'100%'}}/>
        }
        mapElement={
        <div style={{height:'100%'}}/>
        }
    //    radius={this.props.radius}
        onMapLoad={this.onLoadMap.bind(this)}
        onClick={this.handelClickOnMap.bind(this)}
        />
        </div>
)
    }
}


export default HomeMap;