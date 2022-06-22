import React, {useEffect, useState} from "react";
import TractorFactorService from "../services.js/TractorFactorServices";
import toast from 'react-hot-toast'
import TractorLocationForm from "../components/Search/TractorLocationForm";
import Map from "../components/Search/Map";
import Button from 'react-bootstrap/Button';

const SearchContainer = () => {
    const [isSearch, setIsSearch] = useState(true)
    const [tractorObjects, setTractorObjects] = useState(null)
    const [searchPostCode, setSearchPostCode] = useState(null)
    const [manufacturer, setManufacturer] = useState(null)
    const [tractorLocationData, setTractorLocationData] = useState(null)
    const [tractorLatLong, setTractorLatLong] = useState(null)
    const [tractorLatLongRanges, setTractorLatLongRanges] = useState(null)
    const [inspectors, setInspectors] = useState(null)
    


    //**LOADING TRACTOR NAMES**//
    const getManufacturerObjects = () => {
        TractorFactorService.getAllManufacturers()
        .then(data => {setTractorObjects(data)})
    }

    useEffect(() => {
        getManufacturerObjects()
    }, [])

    //**HANDLING FORM INPUT  **/
    const handleSearchPostCode = (postcode) => {
        setSearchPostCode(postcode)
    }

    const handleTractorManufacturer = (manufacturer)=> {
        setManufacturer(manufacturer)
    }


    //**CALLING POSTCODE API AND SAVING RETURNED LAT AND LONG */
    const getTractorLatAndLng = () => {
        return fetch(`http://api.postcodes.io/postcodes/${searchPostCode}`)
        .then(res => {
            if (res.ok){
                return res.json();
            }
            throw new Error('try a different post code')
        })
        .then(data => setTractorLocationData(data)) // listening for state change, triggers when not null
        .catch((error) => {
            toast.error("Invalid postcode")
        })
    }

    useEffect (() => { // can this be added to other useEffect?
        if (searchPostCode != null){
        getTractorLatAndLng()
        }
    }, [searchPostCode, manufacturer])

    //**FORMATTING API RETURN FOR GOOGLE API **/
    let tractorLatAndLong;
    useEffect(() => {
        if (tractorLocationData !== null){
            prepareDataForFetchRequest()
            tractorLatAndLong = {lat: tractorLocationData.result.latitude, lng: tractorLocationData.result.longitude}
            setTractorLatLong(tractorLatAndLong)
        }
    }, [tractorLocationData])

    //**LIMITING RANGE FOR DB FETCH REQUEST **/
    const prepareDataForFetchRequest = () => {
        setTractorLatLongRanges({
            minLat: tractorLocationData.result.latitude-1.0,
            maxLat: tractorLocationData.result.latitude+1.0,
            minLng: tractorLocationData.result.longitude-1.0,
            maxLng: tractorLocationData.result.longitude+1.0
        })
    }

    useEffect(() => {
        if(tractorLatLongRanges!==null){
        fetchInspectors()
        }
    }, [tractorLatLongRanges])

    useEffect(() => {
        if(inspectors !== null){
            if(inspectors.length !== 0){
                getInspectorLatLong()}
            else{
                broadenSearch()
            }
        }
    }, [inspectors])

    const broadenSearch = () => {
        console.log("broadening the search")
        if(tractorLatLongRanges.minLat > tractorLocationData.result.latitude-5){
            setTractorLatLongRanges({
                minLat: tractorLatLongRanges.minLat-1.0,
                maxLat: tractorLatLongRanges.maxLat+1.0,
                minLng: tractorLatLongRanges.minLng-1.0,
                maxLng: tractorLatLongRanges.maxLng+1.0
            })
        } else{
            toast.error("No results")
        }
    }

    const fetchInspectors = () => {
        fetch(`http://localhost:8080/inspectors?manufacturer=${manufacturer}&minLat=${tractorLatLongRanges.minLat}&maxLat=${tractorLatLongRanges.maxLat}&minLng=${tractorLatLongRanges.minLng}&maxLng=${tractorLatLongRanges.maxLng}`)
        .then(res => {
            if (res.ok){
            return res.json();
            }
            throw new Error('something went wrong')
        })
        .then(data => setInspectors(data)) 
        .catch((error) => {
            console.log(error)
        });
    }
    
    const [inspectorLatLong, setInspectorLatLong] = useState(null)

    


    const getInspectorLatLong = () => {
        const inspectorLatAndLong = inspectors.map((inspector) => {
        return {lat:inspector.lat, lng: inspector.lng}
    })
    setInspectorLatLong(inspectorLatAndLong)
    setIsSearch(false)
    }

    const handleNewSearchClick = () =>{
        setIsSearch(true)
        setInspectorLatLong(null)
    }

   
    
    return(
        <>
            {isSearch === true ? <TractorLocationForm tractors={tractorObjects} handleSearchPostCode={handleSearchPostCode} handleTractorManufacturer={handleTractorManufacturer}/> : <Button variant="dark" onClick ={handleNewSearchClick} className="button new-search-button" >New Search</Button> }
            {inspectorLatLong !== null ? <Map tractorLatLong={tractorLatLong} inspectors={inspectors} inspectorLatAndLong={inspectorLatLong}/> : null }
        </>
    )

    }

export default SearchContainer;