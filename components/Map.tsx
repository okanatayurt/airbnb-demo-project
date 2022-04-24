import React from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { SearchResultItem } from '../pages/search'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapComp = ({ searchResult }: any) => {
  const [showPopup, setShowPopup] = React.useState(true)
  // Get coordinates from our data.
  const coordinates = searchResult.map((result: SearchResultItem) => ({
    latitude: result.lat - 0.15,
    longitude: result.long,
  }))
  // To get center of coordinates we use getCenter from geolib.
  const center = getCenter(coordinates)

  const [viewState, setViewState] = React.useState({
    // @ts-ignore
    latitude: center.latitude,
    // @ts-ignore
    longitude: center.longitude,

    zoom: 11,
  })

  // Selected Location Satate
  const [selectedLocation, setSelectedLocation] =
    React.useState<SearchResultItem>()

  console.log(selectedLocation)

  return (
    <Map
      onMove={(evt) => setViewState(evt.viewState)}
      {...viewState}
      mapStyle="mapbox://styles/oknatyrt/cl23j5mol000x14ru3pytx49c"
      mapboxAccessToken={
        'pk.eyJ1Ijoib2tuYXR5cnQiLCJhIjoiY2wyM2oxN2loMDdmZTNjbzBsdXJkamttcSJ9.vadz0Mk3VgeuiNq0rzWfkg'
      }
    >
      {searchResult.map((result: SearchResultItem) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} anchor="center">
            <p
              role="img"
              onClick={() => {
                setSelectedLocation(result)
              }}
              className="animate-bounce cursor-pointer text-2xl"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation?.long === result.long ? (
            <Popup
              onClose={() => {
                //@ts-ignore
                setSelectedLocation({})
                setShowPopup(false)
              }}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </Map>
  )
}

export default MapComp
