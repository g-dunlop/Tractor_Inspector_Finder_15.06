import React, {useState, useEffect} from 'react';
import AdminInspectorItem from './AdminInspectorItem';
import Table from 'react-bootstrap/Table'

const AdminInspectorsList = ({inspectors, updateInspector}) => {

    const [mappedInspectors, setMappedInspectors] = useState(null)

    const mapInspectors = () => {
        const mappedArray = inspectors.map((inspector, index) => {
            return <AdminInspectorItem inspector={inspector} key={index} updateInspector={updateInspector} />
        })
        setMappedInspectors(mappedArray)
    }

    useEffect(() => {
        if (inspectors !== null){
         mapInspectors()
        }
    }, [])


    return (
        <>
            <h3>Inspectors:</h3>
            <div className="inspector-information">
             {mappedInspectors !== null ? 
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address </th>
                            <th>Phone </th>
                            <th>Email </th>
                            <th>Rating </th>
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

export default AdminInspectorsList;