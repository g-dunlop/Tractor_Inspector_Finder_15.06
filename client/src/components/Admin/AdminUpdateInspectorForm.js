import React, {useState, useEffect} from "react";
import toast from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {FormCheck} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

const AdminUpdateInspectorForm = ({inspectorToUpdate, handleSubmission, tractorsArray, updateInspectorInDb, mappedManufacturers}) => {

    const [name, setName] = useState(inspectorToUpdate.name)
    const [postcode, setPostcode] = useState(inspectorToUpdate.postcode)
    const [address, setAddress] = useState(inspectorToUpdate.address)
    const [phoneNumber, setPhoneNumber] = useState(inspectorToUpdate.phoneNumber)
    const [email, setEmail] = useState(inspectorToUpdate.email)
    const [inspectorLocationData, setInspectorLocationData] = useState()
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)

    const [newInspector, setNewInspector] = useState(null)

    const handleChange = (evt) => {
        const state = evt.target.name
        if (state === 'name'){
            setName(evt.target.value)
        } else if(state === 'postcode'){
            setPostcode(evt.target.value)
        } else if(state === 'address'){
            setAddress(evt.target.value)
        } else if(state === 'phoneNumber'){
            setPhoneNumber(evt.target.value)
        } else if (state ==='email'){
            setEmail(evt.target.value)
        } 
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://api.postcodes.io/postcodes/${postcode}`)
        .then(res => {
            if (res.ok){
                return res.json();
            }
            throw new Error('try a different post code')
        })
        .then(data => setInspectorLocationData(data)) // listening for state change, triggers when not null
        .catch((error) => {
            toast.error("Invalid postcode")
        })
    }
       
    useEffect(() => {
        if(inspectorLocationData!= null){
          setLat(inspectorLocationData.result.latitude)
          setLng(inspectorLocationData.result.longitude)
        }
      }, [inspectorLocationData])

      const addInspectorObject = () => {
        setNewInspector( {
            id: inspectorToUpdate.id,
            name:name,
            postcode:postcode,
            address:address,
            phoneNumber:phoneNumber,
            email:email,
            lat:lat,
            lng:lng,
            tractorIds:tractorsArray
        })
    }
    
    useEffect(() => {
        if (lat !== null && lng !== null){
            addInspectorObject()
        }
    }, [lat, lng])

    useEffect(() => {
        if (newInspector !== null){
            updateInspectorInDb(newInspector)
        }
    }, [newInspector])

    return (
        
        <section className="search-form-container"> 
            
            <Form id="add-i" className="search-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                        <Form.Control onChange={handleChange} type="text"  value={name} name="name" placeholder="Name" required></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Postcode"
                            className="mb-3"
                        >
                        <Form.Control onChange={handleChange} type="text"  value={postcode} name="postcode" placeholder="postcode" required></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Address"
                            className="mb-3"
                        >
                        <Form.Control onChange={handleChange} type="text" value={address} name="address" placeholder="address" required></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Phone Number"
                            className="mb-3"
                        >
                        <Form.Control onChange={handleChange} type="text" value={phoneNumber} name="phoneNumber" placeholder="phone number" required></Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                        <Form.Control onChange={handleChange} type="email" value={email} name="email" placeholder="email" required></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <h5>Can inspect:</h5>
                <fieldset>
                    {mappedManufacturers}
                </fieldset>
                
                <Button variant="success" className="admin-button" type="submit" value="Update Inspector">Update Inspector</Button>
            </Form>
        </section>
        
    )
}
export default AdminUpdateInspectorForm;