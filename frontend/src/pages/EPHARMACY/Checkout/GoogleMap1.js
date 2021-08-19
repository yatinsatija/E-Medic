// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import React, { Component } from "react";

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
//         <Marker onClick={this.onMarkerClick} name={"Current location"} />

//         <InfoWindow onClose={this.onInfoWindowClose}>
//           {/* <div>
//             <h1>{this.state.selectedPlace.name}</h1>
//           </div> */}
//         </InfoWindow>
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
// })(MapContainer);

import React from "react";
// import './App.css';
// import "./"

class Map extends React.Component {
  async componentDidMount() {
    const tt = window.tt;
    // var MADRID = [-3.7038, 40.4168];
    const map = tt.map({
      key: "GaEXgiQc4oiI5iJ7Ab6ALanuaF4lOcZx",
      container: "map",
      style: "tomtom://vector/1/basic-main",
      //   center: MADRID,
      ZOOM: 14,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    this.map = map;
    this.tt = tt;
    this.points = [];
    var isTrue = false;
    const self = this;
    map.on("load", () => {
      this.map.flyTo({
        center: {
          lng: 77.5946,
          lat: 12.9716,
        },
        zoom: 14, // you can also specify zoom level
      });
    });
  }

  render() {
    return (
      <div>
        {/* <input type="text" id="query" value="austin" /> */}
        {/* <button onClick={localStorage.setItem("place",)}>Search</button> */}
        <div
          id="map"
          style={{
            height: "1200px",
            width: "900px",
            position: "absolute",
            marginLeft: "150px",
          }}
        ></div>
        {/* <button onClick={this.response}>Get location</button> */}
      </div>
    );
  }
}

export default Map;
