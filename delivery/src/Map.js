import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useCallback, useRef } from "react";

import mapStyles from "./mapstyles.js";
import locator from "./pics/location.svg";
import { restaurantLocations } from "./restaurants";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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

export default function Map({ setCustAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
    libraries,
  });

  function handleGetAddress(lat, lng) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GMAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((results) => setCustAddress(results.results[0].formatted_address));
  }

  const [myLocation, setMyLocation] = useState(null);

  function onMapClick(event) {
    handleGetAddress(event.latLng.lat(), event.latLng.lng());
    setMyLocation({
      name: "Your location",
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const [selected, setSelected] = useState(null);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="Map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {restaurantLocations.map((restaurant) => {
          return (
            <Marker
              key={restaurant.id}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              onClick={() => setSelected(restaurant)}
            />
          );
        })}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h3>{selected.name}</h3>
            </div>
          </InfoWindow>
        ) : null}

        {myLocation ? (
          <Marker
            position={{ lat: myLocation.lat, lng: myLocation.lng }}
            onClick={() => setSelected(myLocation)}
          />
        ) : null}
      </GoogleMap>
      <Search
        panTo={panTo}
        setCustAddress={setCustAddress}
        setMyLocation={setMyLocation}
        handleGetAddress={handleGetAddress}
      />
    </div>
  );
}

function Locate({ panTo, handleGetAddress }) {
  return (
    <button
      className="LocatorButton"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleGetAddress(
              position.coords.latitude,
              position.coords.longitude
            );
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img
        className="Locator"
        src={locator}
        alt="Locate position on your location"
      />
    </button>
  );
}

function Search({ panTo, setCustAddress, setMyLocation, handleGetAddress }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  return (
    <>
      <Combobox
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log(results[0]);
            panTo({ lat, lng });
            setMyLocation({
              name: "Your location",
              lat: lat,
              lng: lng,
            });
          } catch (error) {
            console.log(error);
          }
          setValue(address, false);
          setCustAddress(address);
          clearSuggestions();
        }}
      >
        <ComboboxInput
          className="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                ></ComboboxOption>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <Locate
        panTo={panTo}
        setCustAddress={setCustAddress}
        setMyLocation={setMyLocation}
        handleGetAddress={handleGetAddress}
      />
    </>
  );
}
