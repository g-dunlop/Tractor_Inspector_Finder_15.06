import React, {useEffect, useState} from 'react';
import AdminInspectorsList from './AdminInspectorsList';
import Form from 'react-bootstrap/Form'
import Col  from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap';


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
            <Form className="inspector-search-form">
                <Form.Group as= {Row} className="mb-3" controlId="exampleForm.ControlInput1">
                    
                    
                    <Form.Label column sm={3} for='inspector'><h4>Enter Name:</h4> </Form.Label>
                   
                    <Col sm={7}>
                    <Form.Control size ='lg' onChange={handleChange} type="search" ></Form.Control>
                    </Col>
                   
                </Form.Group>
            </Form>

            {inspectors!== null ? <AdminInspectorsList inspectors={inspectors} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} /> : null}
        </>
    )
}

export default AdminInspectorSearchForm;