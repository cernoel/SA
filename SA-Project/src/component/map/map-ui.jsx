// https://github.com/fullstackreact/google-maps-react

import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const MapStyle = {
  width: '100%',
  height: '100%',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  position: 'relative'
}

var myMarkers = [
  {id: 1, title: "Spar1", name: "Adresse1", lon: 15.4213715, lat: 47.076668},
  {id: 2, title: "Spar2", name: "Adresse2", lon: 15.4214715, lat: 47.077668}
];

var Poi = {draw: 1, coords: {lon: 15.4213715, lat: 47.076668}, meters: 100}


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    
    let markers = [];

    myMarkers.forEach( function(item){
      markers.push(
      <Marker 
        id={ item.id }
        title= { item.title }
        name= { item.name }
        position = {{ lat: item.lat , lng: item.lon}}
        // i dont know how to call the onMarkerClick() in onClick
        // it should be ... but it doesnt work.. 
        // onClick = {this.onMarkerClick() }
        onClick = { function(){} }
      />)
    })

    return (
      <Map
        item
        xs = { 12 }
        style = { MapStyle }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        className={'map'}
        initialCenter = {{ lat: 47.076668, lng: 15.4213715 }} 
      >
  
        { markers }

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <div>
              { this.state.activeMarker.title } <br />
              { this.state.activeMarker.name }
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    api: (process.env.GOOGLE_API_KEY_GOES_HERE)
})(GoogleMapsContainer)