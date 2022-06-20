import React, {useEffect, useState} from "react";
import TractorFactorService from "../services.js/TractorFactorServices";
import toast, {Toaster} from 'react-hot-toast'
import TractorLocationForm from "../components/Search/TractorLocationForm";

const SearchContainer = () => {
    const [isSearch, setIsSearch] = useState(true)
    const [tractorObjects, setTractorObjects] = useState(null)
    const [searchPostCode, setSearchPostCode] = useState(null)
    const [manufacturer, setManufacturer] = useState(null)
    const [tractorLocationData, setTractorLocationData] = useState(null)

    const [isError, setIsError] = useState(false)



    const getManufacturerObjects = () => {
        TractorFactorService.getAllManufacturers()
        .then(data => {setTractorObjects(data)})
    }

    useEffect(() => {
        getManufacturerObjects()
    }, [])

    const handleSearchPostCode = (postcode) => {
        setSearchPostCode(postcode)
    }

    const handleTractorManufacturer = (manufacturer)=> {
        setManufacturer(manufacturer)
    }

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
            setIsError(true)
                setTimeout(() => {
                    setIsError(false);
                }, 2000)
        })
    }

    useEffect (() => { // can this be added to other useEffect?
        if (searchPostCode != null){
        getTractorLatAndLng()
        }
    }, [searchPostCode, manufacturer])

    // const handleNewSearchClick = () =>{
    //     setIsSearch(true)
    //     setInspectorLatLong(null)
    // }
    
    return(
        <>
            {isSearch === true ? <TractorLocationForm tractors={tractorObjects} handleSearchPostCode={handleSearchPostCode} handleTractorManufacturer={handleTractorManufacturer}/> : <button className="button new-search-button" >New Search</button> }

        </>
    )

    }

export default SearchContainer;