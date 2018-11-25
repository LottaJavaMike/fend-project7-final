import React, { Component } from "react";
import PropTypes from "prop-types";

class Venue extends Component {
  static propTypes = {
    venue: PropTypes.object.isRequired,
    listOpen: PropTypes.bool.isRequired
  };

  showInfo = () => {
    // force marker click
    window.google.maps.event.trigger(this.props.venue.marker, "click");
  };

  render() {
    const { venue, listOpen } = this.props;

    return (
      <li className="venue">
        <div
          onClick={this.showInfo}
          onKeyPress={this.showInfo}
          role="button"
          tabIndex={listOpen ? "0" : "-1"}
        >
          {venue.name}
        </div>
      </li>
    );
  }
}

export default Venue;
