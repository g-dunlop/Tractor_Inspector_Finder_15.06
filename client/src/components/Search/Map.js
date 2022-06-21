import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import config from '../../config';

const containerStyle = {
  width: '400px',
  height: '400px'
};



function MyComponent({tractorLatLong}) {
  return (
    <LoadScript
      googleMapsApiKey = {config.API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={tractorLatLong}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)
  
   
  