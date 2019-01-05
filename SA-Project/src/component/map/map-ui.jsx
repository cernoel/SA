/*
import React from "react";
import "./mapCss.css";

class Map extends React.Component {
  loadMap = () => {
    getScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAr087sZf_8anHJg-cXHlLTtXkD10LBhrE&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  componentDidMount() {
    this.loadMap();
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 47.076668, lng: 15.421371 },
      zoom: 12
    });
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}

function getScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Map;
*/

import React from "react"
import "./mapCss.css";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 47.076668, lng: 15.421371 }}
  >
    <Marker
      position={{ lat: 47.076668, lng: 15.421371 }}
    />
    <Marker
      position={{ lat: 47.086689, lng: 15.431382 }}
    />
    {props.isMarkerShown && <Marker position={{ lat: 47.076668, lng: 15.421371 }} onClick={props.onMarkerClick} />}
    {props.isMarkerShown && <Marker position={{ lat: 47.076669, lng: 15.421372 }} onClick={props.onMarkerClick} />}
    
  </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MyMapComponent