import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import mapStyles from "./mapstyles.js";
import { restaurantLocations } from "./restaurants";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};
const libraries = ["places"];

const center = { lat: 50.013615, lng: 36.32684 };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
    libraries,
  });

  const [myLocation, setMyLocation] = useState({
    id: uuidv4(),
    lat: 50.013615,
    lng: 36.32684,
  });

  const onMapClick = (event) => {
    setMyLocation({
      id: uuidv4(),
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  const [selected, setSelected] = useState(null);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";
  console.log(myLocation, "myLocation");
  console.log(restaurantLocations, "restaurantLocations");

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      onClick={onMapClick}
      // onLoad={onMapLoad}
    >
      {restaurantLocations.map((restaurant) => {
        debugger;
        return (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            onClick={() => setSelected(restaurant)}
          />
        );
      })}
      {selected ? (
        <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
          <div>
            <h1>{selected.name}</h1>
          </div>
        </InfoWindow>
      ) : null}

      <Marker
        key={myLocation.id}
        position={{ lat: myLocation.lat, lng: myLocation.lng }}
      />
    </GoogleMap>
  );
}
