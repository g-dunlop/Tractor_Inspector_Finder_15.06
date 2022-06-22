import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button';


const TractorLocationForm = ({handleSearchPostCode, tractors, handleTractorManufacturer}) => {

    const [postCode, setPostCode] = useState(null)
    const [tractorManufacturer, setTractorManufacturer] = useState("Massey Ferguson")
    const [mappedTractors, setMappedTractors] = useState(null)

    useEffect(()=> {
        if(tractors !== null){
        mapTractors()
        }
    }, [tractors])

    const mapTractors = () => {
        const mappTractors = tractors.map((tractor) => {
            return <option className="home-form-input"  key={tractor.id} value={tractor.manufacturer}>{tractor.manufacturer}</option>
        })
        setMappedTractors(mappTractors)
    }

    const handleChange = (evt) => {
        setTractorManufacturer(evt.target.value)
    }

    const handlePostcodeChange = (evt) => {
        setPostCode(evt.target.value)
        
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleSearchPostCode(postCode)
        handleTractorManufacturer(tractorManufacturer)
    }

    return (
        <section className="search-form-container">

            <h2>Search For An Inspector</h2>

            <Form className="search-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label  htmlFor="tractor">Manufacturer: </Form.Label> 
                <Form.Select aria-label="Default select example" className="home-form-input" onChange={handleChange} name="tractors" id="tractors">
                    <option >Select a manufacturer</option>
                    {mappedTractors}
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Postcode"
                        className="mb-3"
                    >
                     <Form.Control className="home-form-input" onChange={handlePostcodeChange} type="text" name="postcode" placeholder="Postcode" />
                    </FloatingLabel>
                </Form.Group>
               
                <Button variant="success" className="button" type="submit" value="Search">Search</Button>

            </Form>
            
        </section>
    )
}

export default TractorLocationForm;
