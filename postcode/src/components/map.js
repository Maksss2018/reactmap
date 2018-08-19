/*global google*/
import React, { Component } from 'react';
import CostumeMarker from './marker';
import axios from 'axios';
import { apiPrefix } from '../configs/configs.json';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const MapForTwitterKiller = withGoogleMap((props) => {
    let propCenter = props.center;
    let center = (propCenter) => {
        return {
            lat: Number(propCenter.lan),
            lng: Number(propCenter.lng)
        }
    };
    let info = props.info;
    console.log("propCenter== " + JSON.stringify(props.center));
    return <GoogleMap 
    defaultZoom = { 12 }
    center={props.center}
    onClick={props.onClick}
    ref={props.onMapLoad}
        >
        {props.markers!=null?props.markers.map((item,index)=>{
    
        return <CostumeMarker
        key={"map-marker"+index}
        index={index}
        info ={item.info}
        postalCode={item.postalCode}
        position={{lat:item.lat,lng:item.lng}}/>
        }):""}
        
        </GoogleMap>

});
class HomeMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marksOn: [],
            map: null
        };
        this.HandelHovermarker = this.HandelHovermarker.bind(this);
    }

    onLoadMap(map) {
        if (this.state.map !== null)
            return
        this.setState({ map: map })
    }
    handelClickOnMap() {
        let map = this.state.map.isReactComponent;
    }
    HandelHovermarker(id) {
        document.getElementById("map-info-id-" + id).style.display = "block";

    }

    render() {

        let marks = this.props.marks !== null ? this.props.marks.map(function(item, ind) {
            console.log("MAPS POSTAL ==" + JSON.stringify(item.info));
            return { lat: Number(item.lat), lng: Number(item.lng), info: item.info, postalCode: { longName: item.info.postalCode.long_name, shortName: item.info.postalCode.short_name } }
        }) : [{ lat: 46.47, lng: 30.73, info: { address: "My native city Odessa  " }, postalCode: { longName: "65000", shortName: "65000" } }];


        return (
            <div style={{ height: '100vh', width: '100%' }}>
        <MapForTwitterKiller
        markers={ marks }
        hover={this.HandelHovermarker}
        center={marks[marks.length-1]}    
        containerElement={
        <div style={{height:'100%'}}/>
        }
        mapElement={
        <div style={{height:'100%'}}/>
        }
    //    radius={this.props.radius}
        onMapLoad={this.onLoadMap.bind(this)}
        />
        </div>
        )
    }
}


export default HomeMap;
