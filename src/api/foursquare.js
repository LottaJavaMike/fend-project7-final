import { CLIENT_ID, CLIENT_SECRET } from "../data/credentials";

const sortName = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

// setup the url and its parameters
const BASEURL = "https://api.foursquare.com/v2/venues/";
const VERS = "20181107";
const RADIUS = "500";
const CATEGORIES = {
  american: "4bf58dd8d48988d14e941735",
  asian: "4bf58dd8d48988d142941735",
  pub: "4bf58dd8d48988d11b941735",
  italian: "4bf58dd8d48988d110941735",
  indian: "4bf58dd8d48988d10f941735",
  greek: "4bf58dd8d48988d10e941735",
  french: "4bf58dd8d48988d10c941735",
  diner: "4bf58dd8d48988d147941735",
  mediterranean: "4bf58dd8d48988d1c0941735",
  mexican: "4bf58dd8d48988d1c1941735",
  middleEastern: "4bf58dd8d48988d115941735",
  steakhouse: "4bf58dd8d48988d1cc941735",
  vegetarian: "4bf58dd8d48988d1d3941735"
};
// create array of categories
const CATEGORY_ID = Object.keys(CATEGORIES).map(cat => CATEGORIES[cat]);

export const getFSLocations = mapCenter => {
  const requestURL = `${BASEURL}search?ll=${mapCenter.lat},${
    mapCenter.lng
  }&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}&categoryId=${CATEGORY_ID}&radius=${RADIUS}&limit=50`;
  return fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        throw response;
      } else return response.json();
    })
    .then(data => {
      const venues = data.response.venues;
      const goodVenues = venues.filter(
        venue =>
          venue.location.address &&
          venue.location.city &&
          venue.location.city === "New York"
      );

      // sort before updating state
      goodVenues.sort(sortName);

      return goodVenues;
    });
};

export const getFSDetails = fsid => {
  // use Foursquare id for search
  const FSID = fsid;

  const requestURL = `${BASEURL}${FSID}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}`;
  return fetch(requestURL).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
