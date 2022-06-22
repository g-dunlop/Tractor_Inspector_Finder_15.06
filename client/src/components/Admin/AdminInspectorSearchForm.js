import React, {useEffect, useState} from 'react';
import AdminInspectorsList from './AdminInspectorsList';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
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
        <section className="search-form-container">
            <h3>Search for a Tractor Inspector:</h3>
            <Form id="search" className="search-form">

                <Form.Group as= {Row} className="mb-3" controlId="exampleForm.ControlInput1">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Enter name of tractor inspector"
                    className="mb-3"
                >
                    <Form.Control size ='lg' onChange={handleChange} type="search" placeholder="Enter name of tractor inspector" ></Form.Control>
                </FloatingLabel>
                </Form.Group>
            </Form>

            {inspectors!== null ? <AdminInspectorsList inspectors={inspectors} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} /> : null}
        </section>
    )
}

export default AdminInspectorSearchForm;