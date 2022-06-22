import React, {useState, useEffect} from 'react';
import SearchInspectorsItem from './SearchInspectorsItem';
import Table from 'react-bootstrap/Table';

const SearchInspectorsList = ({inspectors, count, searchRadius, updateInspector, handleDeleteButtonClick, handleUpdateButtonClick, isDeleteToast}) => {

    const [mappedInspectors, setMappedInspectors] = useState(null)

    const mapInspectors = () => {
        const mappedArray = inspectors.map((inspector, index) => {
            if (inspector.distance < searchRadius){
                let letter = String.fromCharCode("A".charCodeAt(0) + index)
                return <SearchInspectorsItem inspector={inspector} key={index} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} letter={letter} />
            }
        })
        setMappedInspectors(mappedArray)
    }

    useEffect(() => {
        if (inspectors !== null){
         mapInspectors()
        }
    }, [inspectors, count])


    return ( 
        <>
            <h4 className="inspector-list-header">Inspectors:</h4>
            <div className="inspector-information">
             {mappedInspectors !== null ? 
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>-</th>
                            <th>Name</th>
                            <th>Address </th>
                            <th>Distance</th>
                            <th>Phone </th>
                            <th>Email </th>
                            <th>Rating </th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedInspectors}
                        
                    </tbody>
                </Table>: null}
            </div>
        </>
    )
}

export default SearchInspectorsList;