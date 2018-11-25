import noImage from "./images/no-image-available.png";

  // if the data is incomplete
export const checkData = (marker, data) => {
  const venue = data.response.venue;

  const {
    canonicalUrl,
    bestPhoto,
    contact,
    location,
    categories
  } = venue;

  marker.url = canonicalUrl ? canonicalUrl : "https://foursquare.com/";
  marker.photo = bestPhoto
    ? `${bestPhoto.prefix}width100${bestPhoto.suffix}`
    : noImage;
  marker.phone =
    contact && contact.formattedPhone ? contact.formattedPhone : "";
  marker.address = location.address;
  marker.category = categories.length > 0 ? categories[0].name : "";

  return marker;
};


// infowindow content
export const buildInfoContent = marker => {
  marker.infoContent = `<div class="venue">
                      <img class="venue-photo" src=${marker.photo} alt="${marker.title}">
                      <div class="venue-meta">
                        <h2 class="venue-title">${marker.title}</h2>
                        <p class="venue-data">${marker.category}</p>
                        <p class="venue-contact">${marker.address}</p>
                        <a class="venue-phone" href="tel:${marker.phone}">${marker.phone}</a>
                      </div>
                    </div>
                    <a class="venue-link" href="${marker.url}" target="_blank">
                      <span>Read more on Foursquare</span>
                    </a>`;
  return marker;
};

// build infowindow content when there is an error
export const buildErrorContent = marker => {
  marker.infoContent = `<div class="venue-error"  role="alert">
        <h3>Foursquare Venue Details request for ${marker.title} failed</h3>
        <p>Try again later...</p>
      </div>`;
  return marker;
};
