import React, {useEffect, useState} from 'react'
import { GoogleMap, InfoWindow, Marker, Circle, LoadScript, DistanceMatrixService } from '@react-google-maps/api';
import config from '../../config';
import Tractor from '../../static/tractor (3).png';


const containerStyle = {
  width: '400px',
  height: '400px'
};

function MyComponent({tractorLatLong, inspectors, inspectorLatAndLong}) {

  const [distanceMatrixResponse, setDistanceMatrixResponse] = useState(null)

  return (
    <LoadScript
      googleMapsApiKey = {config.API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={tractorLatLong}
        zoom={10}
      >
       
       {distanceMatrixResponse === null ? <DistanceMatrixService
            options={{
                    destinations: inspectorLatAndLong,
                    origins: [tractorLatLong],
                    travelMode: "DRIVING",
                    }}
            callback = {(response) => {
                setDistanceMatrixResponse(response.rows[0].elements)}}
                // console.log(response.rows[0].elements)}}
            /> : null}
        <Marker icon={Tractor} visible={true} position={tractorLatLong} />
        { /* Child components, such as markers, info windows, etc. */ }
        
             
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)
  
   
  