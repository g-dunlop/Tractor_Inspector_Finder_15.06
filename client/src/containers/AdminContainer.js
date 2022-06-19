import React, {useState, useEffect} from "react";
import AdminNav from '../components/AdminNav';
import AdminAddInspectorForm from '../components/AdminAddInspectorForm';
import AdminAddManufacturerForm from '../components/AdminAddManufacturerForm';
import AdminInspectorSearchForm from '../components/AdminInspectorSearchForm';
import AdminInspectorsList from '../components/AdminInspectorsList';
import TractorFactorService from "../services.js/TractorFactorServices";
import toast, {Toaster} from 'react-hot-toast'

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
            setAllInspectors(null)
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

     const handleUpdateButtonClick = (id) => {
        // setIdToUpdate(evt.target.value)
        console.log(id)
    }

    const handleDeleteButtonClick = (id) => {
        TractorFactorService.deleteInspector(id)
        .then(toast.success("Inspector deleted"))
        setTimeout(() => {
            fetchAllInspectors();
        }, 500)
    }

    const getInspectorsByName = (name) => {
        TractorFactorService.getByName(name)
        .then(data => setAllInspectors(data))
    }

    return(
        <>
            <AdminNav handleComponentClick={handleComponentClick} />
            <section className = "admin-form-container">
                {isInspectorActive === true ? <AdminAddInspectorForm allManufacturers={allManufacturers} /> : null }
                {isTractorActive === true ? <AdminAddManufacturerForm /> : null }
                {isSearchActive === true ? <AdminInspectorSearchForm getInspectorsByName={getInspectorsByName} inspectors={allInspectors} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} /> : null }
                {isInspectorsActive === true && allInspectors !== null ? <AdminInspectorsList inspectors={allInspectors} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} /> : null}
            </section>
            

            
        </>
        
    )

}

export default AdminContainer;