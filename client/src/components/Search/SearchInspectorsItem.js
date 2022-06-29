import React, {useState, useEffect} from "react";
import {Rating} from 'react-simple-star-rating';
import toast from 'react-hot-toast';
import InspectorNotes from "../Admin/AdminInspectorNotes";
import Notes from '../../static/notes-icon.png';
import { useAuth0 } from '@auth0/auth0-react';

const SearchInspectorsItem = ({inspector, index, letter}) => {

    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [inspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)
    const [isNotes, setIsNotes] = useState(false);


    const handleRating = (number) => {
        setRating(number)
        let temp = inspector
        temp.rating = number
        setInspectorToUpdate(temp)
    } 

    const handleNotes = (notes) => {
        let temp = inspector
        temp.notes = notes
        setInspectorToUpdate(temp)
    }

    useEffect (() => {
        if (inspectorToUpdate !== null){
        postInspector()
        }

    }, [inspectorToUpdate])

    const {getAccessTokenSilently} = useAuth0();

    const postInspector = () => {
        getAccessTokenSilently()
        .then(accessToken => 
        fetch(`http://localhost:8080/inspectors/${inspectorToUpdate.id}`,{
            method:'PUT',
            body: JSON.stringify(inspectorToUpdate),
            headers:{
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }))
        .then(res=> {
            if (res.ok) {
                toast.success("Inspector updated")
            } else{
            throw new Error('Smething went wrong')
            }
        })
        .catch((error) => {
            toast.error("Not updated")
            });
        }
     
        const handleNotesClick = (evt) => {
            setIsNotes(!isNotes)
        }

    return(
        <>
            <tr>
                <td>{letter}</td>
                <td>{inspector.name}</td>
                <td>{inspector.address}</td>  
                <td>{inspector.distance} </td>
                <td><a href={inspectorPhoneNumber}>{inspector.phoneNumber}</a></td>
                <td><a href={inspectorEmail}>{inspector.email}</a></td>
                <td><Rating onClick={handleRating} allowHalfIcon={true} size={20} ratingValue={rating} /></td>
                <td><div className="table-buttons">
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" alt="a notebook" /></button></div>
                    {isNotes ? <InspectorNotes handleNotesClick={handleNotesClick} inspector={inspector} index={index} handleNotes={handleNotes} /> : null}</td>
                
                    </tr>
            
        </>

    )
}
export default SearchInspectorsItem;