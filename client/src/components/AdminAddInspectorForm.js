import {useState, useEffect} from 'react';
import React from 'react';

const AdminAddInspectorForm = () => {

    const [name, setName] = useState()
    const [postcode, setPostcode] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [email, setEmail] = useState()
    const [tractorsArray, setTractorsArray] = useState([])
    const [inspectorLocationData, setInspectorLocationData] = useState()
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [newInspector, setNewInspector] = useState(null)
    const [tractorObjects, setTractorObjects] = useState(null)
    const [tractorMap, setTractorMap] = useState(null)

    const [updateWorked, setUpdateWorked] = useState(false)

    const [checkedState, setCheckedState] = useState(null)

    
    
        
    

    const handleCheckboxChange = (position) => {
        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position) {
              return !item;
            } else {
              return item;
            }
          });
    
        setCheckedState(updatedCheckedState);
    }
    

    useEffect(() => {
        getTractors()
    }, [])

    const getTractors = () => {
        fetch('http://localhost:8080/tractors')
        .then(res => res.json())
        .then(data => setTractorObjects(data))
    }

    useEffect(() => {
        if(tractorObjects !== null ){
            setCheckedState(new Array(tractorObjects.length).fill(false))
        }
    }, [tractorObjects])

    useEffect(() => {
        if (checkedState !== null){
            mapTractorManufacturers()
        }
    }, [checkedState])

    const mapTractorManufacturers = () => {
        const tractorMapping = tractorObjects.map((tractor, index) => {
            return  <><label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</label> <input onChange={() => handleCheckboxChange(index)} checked={checkedState[index]} name={tractor.id} id={index} key={index} type="checkbox" name={tractor.manufacturer} value={tractor.id}></input></>
        })
        setTractorMap(tractorMapping)
    }

    useEffect(() => {
        if (checkedState!== null){
            setTractorIDArray()
        }
    }, [checkedState])

    const setTractorIDArray = () =>{
        let temp = []
        for (let i=0; i<checkedState.length; i++){
            if (checkedState[i] === true){
                temp.push(tractorObjects[i].id)
            }
        } setTractorsArray(temp)
    }
    

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
        .then(res => res.json())
        .then(data => setInspectorLocationData(data))
    }

    useEffect(() => {
        if(inspectorLocationData!= null){
          setLat(inspectorLocationData.result.latitude)
          setLng(inspectorLocationData.result.longitude)
        }
      }, [inspectorLocationData])




    const addInspectorObject = () => {
        setNewInspector( {
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

 


    const addInspectorToDb = () => {
        if (newInspector !== null){
        fetch('http://localhost:8080/inspectors',{
            method:'POST',
            body: JSON.stringify(newInspector),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=> {
            if (res.ok) {
                setUpdateWorked(true)
                setName("")
                setPostcode("")
                setAddress("")
                setPhoneNumber("")
                setEmail("")
                setInspectorLocationData(null)
                setTractorsArray([])
                setCheckedState(new Array(tractorObjects.length).fill(false))

                setTimeout(() => {
                    setUpdateWorked(false);
                }, 2000)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
        }
    }

    useEffect(() => {
        if (newInspector !== null){
            addInspectorToDb()
        }
    }, [newInspector])


     
    

    return(
        <>
        <form className="add-inspector-form" onSubmit={handleSubmit}>
            <h3>Add Inspector</h3>
            <input onChange={handleChange} type="text"  value={name} name="name" placeholder="name" required></input>
            <input onChange={handleChange} type="text"  value={postcode} name="postcode" placeholder="postcode" required></input>
            <input onChange={handleChange} type="text" value={address} name="address" placeholder="address" required></input>
            <input onChange={handleChange} type="text" value={phoneNumber} name="phoneNumber" placeholder="phone number" required></input>
            <input onChange={handleChange} type="email" value={email} name="email" placeholder="email" required></input>
            <fieldset>
                {tractorMap}
            </fieldset>
            <br></br>
            
            <input className="button" type="submit" value="Add Inspector"></input>
        </form>
        { updateWorked === true ? <h3>Update successful</h3> : null }
        </>
    )
}

export default AdminAddInspectorForm;