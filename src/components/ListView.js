import React, { Component } from "react";
import Venue from "./Venue";
import { getFSLocations, getFSDetails } from "../api/foursquare";
import { checkData, buildInfoContent, buildErrorContent } from "../helpers";
import loaderIcon from "../images/circles-loader.svg";
import PropTypes from "prop-types";

class ListView extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    infowindow: PropTypes.object.isRequired,
    bounds: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    toggleList: PropTypes.func.isRequired,
    listOpen: PropTypes.bool.isRequired
  };

  state = {
    query: "",
    allVenues: [],
    filteredVenues: null,
    apiReturned: false
  };

  componentDidMount() {
    getFSLocations(this.props.mapCenter)
      .then(venues => {
        this.setState({
          allVenues: venues,
          filteredVenues: venues,
          apiReturned: true
        });
        if (venues) this.addMarkers(venues);
      })
      .catch(error => this.setState({ apiReturned: false }));
  }

  addMarkers(venues) {
    const { map, bounds, infowindow, toggleList } = this.props;
    const self = this;

    venues.forEach(location => {
      const position = {
        lat: location.location.lat,
        lng: location.location.lng
      };

      location.marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name,
        id: location.id,
      });

      bounds.extend(position);

      location.marker.addListener("click", function() {
        const marker = this;

        // bounce marker three times then stop
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2100);

        // get venue details for infowindow
        getFSDetails(marker.id)
          .then(data => {
            checkData(marker, data);
            buildInfoContent(marker);
          })
          .catch(() => buildErrorContent(marker))
          .finally(() => {
            // set content and display
            infowindow.setContent(marker.infoContent);
            infowindow.open(map, marker);

            // close listview so infowindow is not hidden
            if (self.props.listOpen) {
              toggleList();
            }
          });
      });
    });

    // size and center map
    map.fitBounds(bounds);
  }

  filterVenues = event => {
    const { allVenues } = this.state;
    const { infowindow } = this.props;
    const query = event.target.value.toLowerCase();

    // update state
    this.setState({ query: query });

    // close infoWindow
    infowindow.close();

    // filter list markers
    const filteredVenues = allVenues.filter(venue => {
      const match = venue.name.toLowerCase().indexOf(query) > -1;
      venue.marker.setVisible(match);
      return match;
    });

    // sort the array
    filteredVenues.sort(this.sortName);

    this.setState({ filteredVenues: filteredVenues });
  };

  showInfo = venue => {
    window.google.maps.event.trigger(venue.marker, "click");
  };

  render() {
    const { apiReturned, filteredVenues, query } = this.state;
    const { listOpen } = this.props;

    // API call fail
    if (apiReturned && !filteredVenues) {
      return <div> Please try again later.</div>;

      // API call completes
    } else if (apiReturned && filteredVenues) {
      return (
        <div className="list-view">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={this.filterVenues}
            className="query"
            role="search"
            aria-labelledby="text filter"
            tabIndex={listOpen ? "0" : "-1"}
          />
          {apiReturned && filteredVenues.length > 0 ? (
            <ul className="venues-list">
              {filteredVenues.map((venue, id) => (
                <Venue key={venue.id} venue={venue} listOpen={listOpen} />
              ))}
            </ul>
          ) : (
            <p id="filter-error" className="empty-input">
              No matches!
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className="loading-fs">
          <h4 className="loading-message">Loading ...</h4>
          <img
            src={loaderIcon}
            className="loaderIcon"
            alt="loading indicator" />
        </div>
      );
    }
  }
}

export default ListView;
