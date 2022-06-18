import React, {useEffect, useState} from 'react';
import AdminInspectorsList from './AdminInspectorsList';

const AdminInspectorSearchForm = ({getInspectorsByName, inspectors, updateInspector, handleDeleteButtonClick, handleUpdateButtonClick}) => {

    const [searchValue, setSearchValue] = useState(null)

    const handleChange = (evt) => {
        setSearchValue(evt.target.value)
    }

    useEffect(() => {
        if (searchValue !== null){
        getInspectorsByName(searchValue)
        }
    }, [searchValue])


    return (
        <>
            <h3>Search:</h3>
            <form className="inspector-search-form">
                
                <label htmlFor='Inspector'>Inspector By Name: </label>
                <input onChange={handleChange} type="search" ></input>
                <p></p>
            </form>

            {inspectors!== null ? <AdminInspectorsList inspectors={inspectors} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} /> : null}
        </>
    )
}

export default AdminInspectorSearchForm;