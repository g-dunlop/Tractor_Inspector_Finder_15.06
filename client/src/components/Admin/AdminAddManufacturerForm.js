import {useState, useEffect} from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';



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
        <section className="search-form-container">
        <h3>Add a Tractor Manufacturer</h3>
        <Form id="add-m" className="search-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Manufacturer"
                    className="mb-3"
                >
                    <Form.Control className="home-form-input" onChange={handleChange} type="text" name="manufacturer" placeholder="manufacturer" />
                </FloatingLabel>
            </Form.Group>
            
            <Button variant="success" className="button" type="submit" value="add-manufacturer">Add Manufacturer</Button>

        </Form>
        </section>
    )
}

export default AdminAddManufacturerForm;