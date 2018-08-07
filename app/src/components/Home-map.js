import React, { Component } from 'react';
import api from 'react';
import { withGoogleMap, Circle, GoogleMap, Marker, CircleProps } from 'react-google-maps';
import { connect } from 'react-redux';
const MapForTwitterKiller = withGoogleMap((props) => {
    const radiusBefor = props.radius;
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
        {props.circle}
        {/*props.markers!=null?props.markers.map((item,index)=>{return <Marker  position={{lat:item.lat, lng:item.lng}}/>}):""*/}
        
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


    /*
    handelMapChange(e) {
        let center = e.center;
        this.setState({ center });
    }*/
    onLoadMap(map) {
        if (this.state.map !== null)
            return
        this.setState({ map: map })
    }
    handelClickOnMap() {
        let map = this.state.map.isReactComponent;

        console.log(" ===== " + map);

        for (var key in map) {
            console.log(" map " + key + " == " + map[key]);
        }


    }
    HandelRadiusChanging(e) {
        console.log("e yarget of radius changing +++++ ");
        /*
        let obj = {
                radius: radius,
                type: placesType,
                lat: cords.lat,
                lng: cords.lng
            };
            
            this.props.getMarksByType(obj);*/
    }
    clickRes(e) {
        console.log(" event : " + JSON.stringify(e));
    }
    handelresize() {
        console.log("Cirle :" + this.state.map.children.Circle.getRadius());
    }
    render() {

        let user = this.props.user != null ? this.props.user.marks : [{ lat: 46.47, lng: 30.73 }],
            marks = user.map(function(item, ind) {

                return { lat: item.lat, lng: item.lng }
            }),
            nearestPlaces = this.props.nearestPlaces != null ? this.props.nearestPlaces.data.map((item, index) => {
                return { lat: item.geometry.location.lat, lng: item.geometry.location.lng, otherData: item }
            }) : null;

        nearestPlaces != null ? marks.concat(nearestPlaces) : console.log(" do nothing");
        console.log("marks" + JSON.stringify(marks));
        return (
            <div style={{ height: '100vh', width: '100%' }}>
        <MapForTwitterKiller
        markers={this.props.nearestPlaces != null ?(marks)=>{
        marks.concat(nearestPlaces);
        }  :  marks }
        center={marks[0]}    
        containerElement={
        <div style={{height:'100%'}}/>
        }
        mapElement={
        <div style={{height:'100%'}}/>
        }
    //    radius={this.props.radius}
        callNewData={this.HandelRadiusChanging.bind(this)}
        clickRes={this.clickRes.bind(this)}
        onMapLoad={this.onLoadMap.bind(this)}
        onClick={this.handelClickOnMap.bind(this)}
        clickRes={this.handelresize.bind(this)}
        
        />
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        nearestPlaces: state.nearestPlaces
    }
};

export default connect(mapStateToProps)(HomeMap);
