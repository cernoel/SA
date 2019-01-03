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
