import {useState, useEffect} from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast, {Toaster} from 'react-hot-toast'


const AdminAddManufacturerForm = () => {

    const [manufacturer, setManufacturer] = useState();
    const [newTractor, setNewTractor] = useState();
    const [addWorked, setAddWorked] = useState(false);

    const handleChange = (evt) => {
        setManufacturer(evt.target.value)
    }

    useEffect(() => {
        if (manufacturer !== null){
            setNewTractor( {
                manufacturer:manufacturer
            })
        }
    }, [manufacturer])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch('http://localhost:8080/tractors',{
            method:'POST',
            body: JSON.stringify(newTractor),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=> {
            if (res.ok) {
                toast.success("Manufacturer added")
                setManufacturer("")
                setTimeout(() => {
                    setAddWorked(false);
                }, 2000)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
    }

    return(
        <Form className="add-tractor-form" onSubmit={handleSubmit}>
            <h3>Add Tractor</h3>
            <Form.Group as= {Row} className="mb-3" controlId="exampleForm.ControlInput1">
            <Col>
            <Form.Control sm = {7} onChange={handleChange} type="text" name="manufacturer" value={manufacturer} placeholder="manufacturer" required></Form.Control>
            </Col>
            <Col>
            <Form.Control sm ={3} className="button" type="submit" value="add tractor"></Form.Control>
            </Col>
            </Form.Group>
            { addWorked === true ? <h3>Successfully added!</h3> : null}

        </Form>
    )
}

export default AdminAddManufacturerForm;