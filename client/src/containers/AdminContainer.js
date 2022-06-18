import React, {useState, useEffect} from "react";
import AdminNav from '../components/AdminNav';
import AdminAddInspectorForm from '../components/AdminAddInspectorForm';
import AdminAddManufacturerForm from '../components/AdminAddManufacturerForm';
import AdminInspectorSearchForm from '../components/AdminInspectorSearchForm';
import AdminInspectorsList from '../components/AdminInspectorsList';
import TractorFactorService from "../services.js/TractorFactorServices";

const AdminContainer = () => {

    const [isInspectorActive, setIsInspectorActive] = useState(false)
    const [isTractorActive, setIsTractorActive] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isInspectorsActive, setIsInspectorsActive] = useState(false)
    const [allManufacturers, setAllManufacturers] = useState(null)
    const [allInspectors, setAllInspectors] = useState(null)

    const handleComponentClick = (component) => {
        if (component === 'add-inspector'){
            setIsInspectorActive(!isInspectorActive)
            setIsTractorActive(false) 
            setIsSearchActive(false)
            setIsInspectorsActive(false)
        } 
        else if(component === 'add-manufacturer'){
            setIsInspectorActive(false)
            setIsTractorActive(!isTractorActive)
            setIsSearchActive(false)
            setIsInspectorsActive(false)
        }

        else if (component === 'search-inspectors'){
            setIsInspectorActive(false)
            setIsTractorActive(false)
            setIsSearchActive(!isSearchActive)
            setIsInspectorsActive(false)
        }

        else {
            setIsInspectorActive(false)
            setIsTractorActive(false)
            setIsSearchActive(false)
            setIsInspectorsActive(!isInspectorsActive)
        }
    }

    //**ALL TRACTORS**/
    const fetchAllTractors = () => {
        TractorFactorService.getAllManufacturers()
        .then(data => setAllManufacturers(data));
    }

    useEffect(() => {
        if(isTractorActive === true){
        fetchAllTractors()
        }
    }, [isTractorActive] )

    //**ALL INSPECTORS **/
    const fetchAllInspectors = () => {
        TractorFactorService.getAllInspectors()
        .then(data => setAllInspectors(data));
    }

    useEffect(() => {
        if (isInspectorsActive === true){ 
            fetchAllInspectors() 
        }
     }, [isInspectorsActive])

     //**UPDATE INSPECTOR */
     const updateInspector = (inspectorToUpdate) => {
        TractorFactorService.updateInspector(inspectorToUpdate)
     }

    return(
        <>
            <AdminNav handleComponentClick={handleComponentClick} />

            <section className = "admin-form-container">
                {isInspectorActive === true ? <AdminAddInspectorForm allManufacturers={allManufacturers} /> : null }
                {isTractorActive === true ? <AdminAddManufacturerForm /> : null }
                {isSearchActive === true ? <AdminInspectorSearchForm /> : null }
                {isInspectorsActive === true && allInspectors !== null ? <AdminInspectorsList inspectors={allInspectors} updateInspector={updateInspector}/> : null}
            </section>
        </>
        
    )

}

export default AdminContainer;