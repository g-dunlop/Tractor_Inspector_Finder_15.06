import React, {useState, useEffect} from "react";
import toast from 'react-hot-toast';

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
        <>
             <form className="add-inspector-form" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" value={name} name="name" required></input>
                <input onChange={handleChange} type="text" value={postcode} name="postcode" placeholder="postcode" required></input>
                <input onChange={handleChange} type="text" value={address} name="address" placeholder="address" required></input>
                <input onChange={handleChange} type="text" value={phoneNumber} name="phoneNumber" placeholder="phone number" required></input>
                <input onChange={handleChange} type="email" value={email} name="email" placeholder="email" required></input>
                <fieldset>
                    {mappedManufacturers}
                </fieldset>
                <input className="button" type="submit" value="update"></input>
            

            </form>
        </>
    )
}
export default AdminUpdateInspectorForm;