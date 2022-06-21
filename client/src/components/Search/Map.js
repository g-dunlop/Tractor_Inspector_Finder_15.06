import React, {useEffect, useState} from 'react'
import { GoogleMap, InfoWindow, Marker, Circle, LoadScript, DistanceMatrixService } from '@react-google-maps/api';
import config from '../../config';
import Tractor from '../../static/tractor (3).png';
import { Rating } from 'react-simple-star-rating';
import SearchInspectorsList from './SearchInspectorsList';


const containerStyle = {
  width: '400px',
  height: '400px'
};

function MyComponent({tractorLatLong, inspectors, inspectorLatAndLong}) {

  const [distanceMatrixResponse, setDistanceMatrixResponse] = useState(null)
  const [searchRadius, setSearchRadius] = useState(50.00)
  const [inspectorsWithDistance, setInspectorsWithDistance] = useState(null)
  const [inspectorsMarkersArray, setInspectorsMarkersArray] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const [activeMarkerEmail, setActiveMarkerEmail] = useState(null)
  const [activeMarkerPhoneNumber, setActiveMarkerPhoneNumber] = useState(null)
  const [count, setCount] = useState(0)



    useEffect(() => {
        if (distanceMatrixResponse !== null){
        updateInspectorInfo()
        }
    }, [distanceMatrixResponse])

    const updateInspectorInfo = () => {
        let temp = [...inspectors]
        for (let i=0; i<temp.length; i++){
            const distanceInMiles = (distanceMatrixResponse[i].distance.value/1600).toFixed(2);
            temp[i].distance = parseFloat(distanceInMiles)
        } 
        temp.sort(function(a,b){return a.distance - b.distance})
        setInspectorsWithDistance(temp)
    }



    useEffect(() => {
        if(inspectorsWithDistance !== null){
        setMarkers()
        }
    }, [inspectorsWithDistance, searchRadius])

    const setMarkers = () => {
        const markersArray = inspectorsWithDistance.map((inspector, index) => {
            if (inspector.distance < searchRadius){
                let letter = String.fromCharCode("A".charCodeAt(0) + index)
                return   <Marker  
                            key={index} 
                            icon={"http://maps.google.com/mapfiles/marker" + letter + ".png"} 
                            index={index} 
                            value={index} 
                            onClick={(e) => {handleClickOpen(index)} }
                            position = {{lat:inspector.lat , lng: inspector.lng}} inspector={inspector} >
                        </Marker>   
            }
        })
        let total = markersArray.length;
        for (let i=0; i<markersArray.length; i++){
            if(markersArray[i] === undefined){
                total -=1
            }
        } setCount(total)
        setInspectorsMarkersArray(markersArray)
    }

    const handleClickOpen = (index) => {
        setIsOpen(false)
        setIsOpen(true)
        setActiveMarker(inspectorsWithDistance[index])
        setActiveMarkerEmail(`mailto: ${inspectorsWithDistance[index].email}`)
        setActiveMarkerPhoneNumber( `tel: ${inspectorsWithDistance[index].phoneNumber}`)
        console.log(index)
    }

    const handleCloseClick = () => {
        setIsOpen(false)
        setActiveMarker(null)
    }

    const handleIncreaseClick = () => {
        setSearchRadius(searchRadius+5)
        setIsOpen(false)
    }

    const handleDecreaseClick = () => {
        setSearchRadius(searchRadius-5)
        setIsOpen(false)
    }

  return (
    <>
         <div className="map-info">
                    <h3 className="map-info-item"> {inspectors.length} results found:   </h3>showing {count === 1?<h3 className="map-info-item"> {count} inspector within {searchRadius} miles</h3> : <h3 className="map-info-item"> {count} inspectors within {searchRadius} miles</h3>}
                </div>
                <div className="button-container">
                    <button className="button map-button" onClick={handleIncreaseClick}>Increase Search Radius</button>
                    <button className="button map-button" onClick={handleDecreaseClick}>Decrease Search Radius</button>
                </div>
        <LoadScript
        googleMapsApiKey = {config.API_KEY}
        >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={tractorLatLong}
            zoom={7}
            
        >
        
        {distanceMatrixResponse === null ? <DistanceMatrixService
                options={{
                        destinations: inspectorLatAndLong,
                        origins: [tractorLatLong],
                        travelMode: "DRIVING",
                        }}
                callback = {(response) => {
                    setDistanceMatrixResponse(response.rows[0].elements)}}
                /> : null}
            <Circle
                center={
                    tractorLatLong
                }
                radius={searchRadius*1600}
                options="strokeColor: #ffffff"
                />
            <Marker icon={Tractor} visible={true} position={tractorLatLong} />
            {inspectorsMarkersArray}
            {isOpen === true ? <InfoWindow 
                                                inspector={activeMarker} 
                                                position = {{lat:activeMarker.lat , lng:activeMarker.lng }}
                                                visible={true}
                                                onCloseClick={handleCloseClick}> 
                                                    <div>
                                                            <ul className="info-window-list">
                                                                <li><span className="bold">Rating: <Rating readonly={true} size={15} ratingValue={activeMarker.rating} /></span></li>
                                                                <li><span className="bold">Name: </span>{activeMarker.name}</li>
                                                                <li><span className="bold">Address: </span>{activeMarker.address}</li>
                                                                <li><span className="bold">Postcode: </span>{activeMarker.postcode}</li>
                                                                <li><span className="bold">Distance: </span>{activeMarker.distance} miles</li>
                                                                <li><span className="bold">Phone: </span><a href={activeMarkerPhoneNumber}>{activeMarker.phoneNumber}</a></li>
                                                                <li><span className="bold">Email: </span><a href={activeMarkerEmail}>{activeMarker.email}</a></li>
                                                            </ul>
                                                    
                                                    </div>
                                                </InfoWindow> : null}
            { /* Child components, such as markers, info windows, etc. */ }
            
                
        </GoogleMap>
        </LoadScript>

        <SearchInspectorsList searchRadius = {searchRadius} inspectors = {inspectorsWithDistance}/>
    </>
  )
}

export default React.memo(MyComponent)
  
   
  