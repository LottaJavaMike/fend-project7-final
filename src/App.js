import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { MAP_KEY } from "./data/credentials";
import { mapStyles } from "./components/mapStyles.js";
import menuIcon from "./images/icon_menu-alt_3232.png";
import ListView from "./components/ListView";

class App extends Component {
  state = {
    listOpen: true,
    map: {},
    infowindow: {},
    bounds: {},
    mapReady: false,
    mapCenter: { lat: 40.7413549, lng: -73.9980244 },
    mapError: false,
    width: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentDidUpdate({ isScriptLoadSucceed }) {
    // did the script load
    if (isScriptLoadSucceed && !this.state.mapReady) {
      // load map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: this.state.mapCenter,
        styles: mapStyles
      });

      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({ maxWidth: 300 });

      this.setState({
        map: map,
        infowindow: infowindow,
        bounds: bounds,
        mapReady: true
      });
    } else if (!this.state.mapReady) {
      this.setState({ mapError: true });
    }
  }

  toggleList = () => {
    const { width, listOpen, infowindow } = this.state;

    if (width < 600) {
      // if listview is open close the infowindow
      if (!listOpen) {
        infowindow.close();
      }
      this.setState({ listOpen: !listOpen });
    }
  };

  updateWidth = () => {
    const { map, bounds } = this.state;
    this.setState({ width: window.innerWidth });
    if (map && bounds) {
      map.fitBounds(bounds);
    }
  };

  render() {
    const {
      listOpen,
      map,
      infowindow,
      bounds,
      mapReady,
      mapCenter,
      mapError
    } = this.state;

    return (
      <div className="container" role="main">
        <nav id="list-toggle" className="toggle" onClick={this.toggleList}>
          <img
                src={menuIcon}
                className="menuIcon"
                alt="menu icon" />
        </nav>
        <section
          id="restaurant-list"
          className={listOpen ? "list open" : "list"}
          role="complementary"
          tabIndex={listOpen ? "0" : "-1"}
        >
          <h1 className="app-title">Midtown Munchies</h1>
          <hr />
          {
          mapReady ? (
            <ListView
              map={map}
              infowindow={infowindow}
              bounds={bounds}
              mapCenter={mapCenter}
              toggleList={this.toggleList}
              listOpen={listOpen}
            />
          ) : (
            <p>
              No Internet connection
            </p>
          )}
        </section>
        <section id="map" className="map" role="application">
          {mapError ? (
            <div id="map-error" className="error" role="alert">
              Google Maps is unable to load at this time.
            </div>
          ) : (
            <div className="loading-map">
              <h4 className="loading-message">Map is loading...</h4>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`
])(App);
